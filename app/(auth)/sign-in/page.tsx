"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { Button } from '@/components/ui/button';
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {getGoogleSignInUrl, signInWithEmail,} from "@/lib/actions/auth.actions";


const SignIn = () => {
    const router = useRouter();
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
    console.log("submitted sign IN PAGE!")
    try {
      const result = await signInWithEmail(data);
      console.log("result", result)
      if(result.success) { router.push('/');

      } else {
        toast.error("Sign in Failed", { 
          description: result.error || "failed",
        })
      }
     



      console.log(data);

    } catch (err: any) {
      console.log("got to toast place", err);
      toast.error("Sign In failed got to toast", {
        description: err instanceof Error ? err.message : "failed to sign in",
      })
    }
  };
  /*
     const handleLogin = async () => {
    try {
      const { success, url } = await getGoogleSignInUrl();
      if (success && url) {
        window.location.href = url;
      
      }
    } catch (err) {
      console.error("Google sign in failed", err);
    }
  };
*/
  return (
    <>
     <h1 className="form-title">Welcome Back</h1>
     <form  onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
       {/* <div className="flex  justify-center"> 
       <Button onClick={handleLogin} className=" hover:cursor-pointer"> Sign In with Google</Button>

        </div>
      
        <h1 className="flex justify-center">Or Continue with</h1>
          */}

       <InputField
          name="email"
          label="Email"
          placeholder="Please Enter Your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is Required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
        <div>
        <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up" />
        <FooterLink text="Forgot password?" linkText="Reset Password" href="/forgot-password" />
            </div>
     </form>
          
    
    </>
  )
}

export default SignIn