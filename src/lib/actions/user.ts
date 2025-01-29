'use server';
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';
import z from 'zod';
import { cookies } from "next/headers";
import { createJWT } from "../util/jwt";

const UserRegistrationFormSchema = z.object({
    username: z.string().refine(val => val.length > 1 && val.length < 31 && !val.includes(','), {
        message: 'Username must be minimum 2 and maxinum 30 characters long and can not contain commas (,).'
    }),
    email: z.string().refine(val => {
        return (val.length > 2 && val.length < 101) && /^[\.\w-]+@[\.\w-]+$/.test(val);
    }, {
        message: 'Please enter a valid email with length of minimum 3 and maxinum 100 characters.'
    }),
    password: z.string().refine(val => {
        return val.length > 4 && val.length < 31
    }, {
        message: 'Password must be at least 5 or at most 30 characters long.'
    }),
    repass: z.string()
}).refine(data => data.password === data.repass && Boolean(data.repass), {
    message: 'Passwords must match.'
});

type PreviousStateProp = {
    msg: string,
    previousValue: string
}

export async function register(
    previousState: {
        success: boolean,
        username: PreviousStateProp,
        email: PreviousStateProp,
        password: PreviousStateProp,
        repass: PreviousStateProp,
        other: PreviousStateProp
    } | null,
    formData: FormData
) {

    previousState = {
        success: false,
        username: {
            msg: '',
            previousValue: ''
        },
        email: {
            msg: '',
            previousValue: ''
        },
        password: {
            msg: '',
            previousValue: ''
        },
        repass: {
            msg: '',
            previousValue: ''
        },
        other: {
            msg: '',
            previousValue: ''
        }
    };
    // validate registration data
    const result = UserRegistrationFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        repass: formData.get('repass')
    });
    if (!result.success) {
        // return false state with errors
        previousState.success = false;
        result.error.issues.forEach(err => {
            if (!err.path[0]) {
                // case repass
                previousState.repass.msg = err.message;
            } else {
                const pathName: string = err.path[0].toString();
                ((previousState as any)[pathName] as PreviousStateProp).msg = err.message;
            }
        });
        return previousState;
    }
    try {
        // add default user pic url
        // hash password
        const data = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: await bcrypt.hash(formData.get('password') as string, 12),
            profilePictureUrl: '/default_user_profile_picture.jpg'
        }
        // check if username or email is taken
        const userData = await sql`SELECT ("userID", username, password) FROM "User" WHERE (username = ${data.username});`;
        if (userData.rows[0]?.row) {
            throw new Error(`The username: "${data.username}" is taken.`);
        }
        // add user in db
        await sql`
            INSERT INTO "User" (username, email, password, "profilePictureURL")
            VALUES (${data.username}, ${data.email}, ${data.password}, ${data.profilePictureUrl})
        `;
        const { rows } = await sql`SELECT ("userID", username, password) FROM "User" WHERE (username = ${data.username});`;
        if (!rows[0]?.row) {
            throw new Error(`Could not find a user with username: "${data.username}".`);
        }
        const [id, username, hash] = rows[0].row.slice(1, rows[0].row.length - 1).split(',');
        const token = await createJWT({userID: id});
        if (token instanceof Error) {
            throw token;
        }
        const cookiePool = await cookies();
        cookiePool.set('session', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 365 * 100, 
        });
    } catch (err) {
        previousState.success = false;
        previousState.other.msg = (err as Error).message;
        console.error((err as Error).message);
        return previousState;
    }
    // return successful previousState 
    previousState.success = true;
    previousState.username.previousValue = formData.get('username') as string;
    previousState.email.previousValue = formData.get('email') as string;
    return previousState;
}

export async function login(
    previousState: {
        success: boolean,
        username: PreviousStateProp,
        password: PreviousStateProp,
        other: PreviousStateProp
    } | null,
    formData: FormData
) {
    previousState = {
        success: false,
        username: {
            msg: '',
            previousValue: ''
        },
        password: {
            msg: '',
            previousValue: ''
        },
        other: {
            msg: '',
            previousValue: ''
        }
    };
    const rememberMe = Boolean(formData.get('rememberAccount'));
    const usernameToCheck = formData.get('username')! as string || '';
    const passwordToCheck = formData.get('password')! as string || '';
    try {
        const { rows } = await sql`SELECT ("userID", username, password) FROM "User" WHERE (username = ${usernameToCheck});`;
        if (!rows[0]?.row) {
            throw new Error(`Could not find a user with username: "${usernameToCheck}".`);
        }
        const [id, username, hash] = rows[0].row.slice(1, rows[0].row.length - 1).split(',');
        const passwordsMatch = await bcrypt.compare(passwordToCheck, hash);
        if (!passwordsMatch) {
            previousState.success = false;
            previousState.password.msg = 'Incorrect password.';
            previousState.username.previousValue = usernameToCheck;
            return previousState;
        }
        const token = await createJWT({userID: id});
        if (token instanceof Error) {
            throw token;
        }
        const cookiePool = await cookies();
        cookiePool.set('session', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 365 * 100, 
        });
    } catch (err) {
        console.error(err);
        previousState.success = false;
        previousState.other.msg = (err as Error).message;
        previousState.username.previousValue = usernameToCheck;
        return previousState;
    }
    previousState.success = true;
    previousState.username.previousValue = usernameToCheck;
    return previousState;
}