"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';
import { forgotPassword } from '@/lib/actions/auth.actions';

import { toast } from 'sonner';

const page = () => {

   
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ForgotPassword>();
    
    const onSubmit = async (data: ForgotPassword) => {
        try {
           
            await forgotPassword(data);
            toast.success(
                "Sent an email link to reset password"
            )
            
            
        } catch (err: any) {
            console.log(err)
        }
    }



  return (
   <>
   <h1 className="form-title"> Forgot Password?</h1>
   <form onSubmit={handleSubmit(onSubmit)}  className="space-y-5">
     <InputField
          name="email"
          label="Email"
          placeholder="Please Enter Your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is Required",
            pattern:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email adress is required",
          }}
        />
    <Button
    type="submit"
    onClick={() => console.log(" Button clicked!")}
    className="yellow-btn w-full mt-5"
    >
        {isSubmitting ? "Email has been sent!": "Click to reset"}

    </Button>
    


   </form>
       
   </>
  )
}

export default page
