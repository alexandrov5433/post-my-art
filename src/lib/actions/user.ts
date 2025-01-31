'use server';
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';
import z from 'zod';
import { genJWTAndSetSessionCookie, deleteSessionCookie } from "./session";


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
    const rememberMe = Boolean(formData.get('rememberAccount'));
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
        const [usernameTaken, emailTaken] = await Promise.all([
            sql`SELECT (username) FROM "User" WHERE (username = ${data.username});`,
            sql`SELECT (email) FROM "User" WHERE (email = ${data.email});`
        ]);
        if (usernameTaken?.rows[0]?.username || emailTaken?.rows[0]?.email) {
            throw new Error(
                ''.concat(
                    usernameTaken?.rows[0]?.username ? `The username: "${data.username}" is taken. ` : '',
                    emailTaken?.rows[0]?.email ? `The email: "${data.email}" is already in use.` : ''
                )
            );
        }
        // add user in db
        await sql`
            INSERT INTO "User" (username, email, password, "profilePictureURL")
            VALUES (${data.username}, ${data.email}, ${data.password}, ${data.profilePictureUrl})
        `;
        // get new user´s userID
        const { rows } = await sql`SELECT ("userID") FROM "User" WHERE (username = ${data.username});`;
        if (!rows[0]?.userID) {
            throw new Error(`Could not find a user with username: "${data.username}".`);
        }
        // generate JWT and set cookie
        await genJWTAndSetSessionCookie(rows[0]?.userID, rememberMe);
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
        await genJWTAndSetSessionCookie(id, rememberMe);
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