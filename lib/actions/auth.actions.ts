'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })
        return { success: true, data: response }
    } catch (e) {
        console.log('Sign up failed', e)
        return { success: false, error: 'Sign up failed' }
    }
} 
 
export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try { 
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign in fatesteriled', e)
        if (e instanceof Error) {
            return {success: false, error: e.message}
        }
        return { success: false, error: "Invalid email or password" }
    }
} 



export const forgotPassword = async ({email}: ForgotPassword) => {
    try {
        const response = await auth.api.requestPasswordReset({
            body: {email},
        })
        
        return {success: true, data: response}

    } catch (e: any) {
        console.log(e)
        return {success: true, error: "Failed to reset"}
    }
    


}

export const resetPassword = async ({token, password}: {token: string, password: string}) => {
    try {
        const response = await auth.api.resetPassword({
            body: 
            {
            token,
            newPassword: password},
        })
        return {success: true, data: response}
    } catch (e: any) {
        console.log(e)
        return {success: false, error: "Password reset Failed"}
    }

}




export const signOut = async () => {
    try { 
        await auth.api.signOut({ headers: await headers() });
        console.log("singouted")
        
    } catch (e) {
        console.log('Sign out failed', e)
        return { success: false, error: 'Sign out failed' }
    }
}