'use server';
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';
import z from 'zod';

const UserRegistrationFormSchema = z.object({
    username: z.string().refine(val => val.length > 1 && val.length < 31, {
        message: 'Username must be minimum 2 and maxinum 30 characters long.'
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

export async function registerNewUser(
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
            email: formData.get('email')  as string,
            password: await bcrypt.hash(formData.get('password') as string, 12),
            profilePictureUrl: '/default_user_profile_picture.jpg'
        }
        // add user in db
        await sql`
            INSERT INTO "User" (username, email, password, "profilePictureURL")
            VALUES (${data.username}, ${data.email}, ${data.password}, ${data.profilePictureUrl})
        `;
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