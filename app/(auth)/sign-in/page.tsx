"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { Button } from '@/components/ui/button';
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {signInWithEmail, signUpWithEmail} from "@/lib/actions/auth.actions";

import {signInEmail} from "better-auth/api";
const SignIn = () => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onBlur",
    });

     const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInwithEmail(data);
      const router = useRouter();
      if(result.success) router.push('/');
    } catch (err: any) {
      console.log(err);
      toast.error('sign in failed', {
        description: err instanceof Error ? err.message : 'failed to sign in'
      })
    }
  };



  return (
    <>
     <h1 className="form-title">Welcome Back</h1>
     <form  onSubmit={handleSubmit(onSubmit)} className="space-y-5">
       <InputField
          name="email"
          label="Email"
          placeholder="Please Enter Your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is Required",
            pattern: /^w+@\w+\.\w+$/,
            message: "Email adress is required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Please Enter Your Password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is Required", minlength: 8 }}
        />


          <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Let's Make Some Money"}
        </Button>
        <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up" />

     </form>
          
    
    </>
  )
}

export default SignIn