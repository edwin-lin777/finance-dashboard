import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies} from "better-auth/next-js";
import { sendResetPasswordEmail } from "../nodemailer";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if(authInstance) return authInstance;

    const mongoose = await connectToDatabase();
    const db = mongoose!.connection.db;

    if(!db) throw new Error('MongoDB connection not found');
    if(db === null) throw new Error("db null")

    console.log()
    authInstance = betterAuth({
        database: mongodbAdapter(db as any),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
        socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            scope: ["openid", "email", "profile"],
        }, 
    },
        onSocialSignUp: async ({ user, profile }:{user: {name: string, email: string}, profile: {name: string, email: string}}) => {
        user.name = profile.name ?? "";
        user.email = profile.email ?? user.email ?? "";
    },
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
            sendResetPassword: async ({user, url, token}, request) => {
                 const resetUrl = `${process.env.BETTER_AUTH_URL}/reset-password?token=${token}`;
                await sendResetPasswordEmail({
                    email: user.email,
                    url: resetUrl,
                }
                );
            },
            onPasswordReset: async ({user}, request) => {
                console.log(`Password for user ${user.email} has been reset`)
            },

        },
        plugins: [nextCookies()],
    });
    

    return authInstance;
}

export const auth = await getAuth();