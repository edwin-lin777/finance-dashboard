"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAuth } from '@/lib/better-auth/auth'
import { useForm } from 'react-hook-form'
import InputField from '@/components/forms/InputField'
import { resetPassword } from '@/lib/actions/auth.actions'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
const ResetPassword = () => {
   const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter()
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ResetPassword>();

  const onSubmit = async (data: ResetPassword) => {
   
    try {
      if (!token){
        toast.error("Missing Token")
        return
      }
      const result = await resetPassword({token, password: data.password})
      if (result.success) {
         toast.success("Password Reset!")
        router.push("/")

      }
       
    } catch (e: any) {
      console.log(e)

    }

    





  }

  return (
   <>
   <h1 className="form-title">Enter New Password</h1>
    <form onSubmit={handleSubmit(onSubmit) } className="space-y-5">
      <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Please Enter Your New Password"
          register={register}
          
          error={errors.password}
          validation={{ required: "Password is Required", minlength: 8 }}
        />
         <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Re-enter your password"
          register={register}
          
          error={errors.password}
          validation={{ required: "Please confirm password", minlength: 8 }}
        />
      <Button
          type="submit"
          onClick={() => console.log(" Button clicked!")}
          className="yellow-btn w-full mt-5"
          
        >
          {isSubmitting ? "Resetting Password" : "Reset Password"}
        </Button>
      </form>



   
   </>
  )
}

export default ResetPassword
