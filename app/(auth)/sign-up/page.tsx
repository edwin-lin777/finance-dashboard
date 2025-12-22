"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      password: "",
      country: "US",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry : "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("submitted!")
    try {
      const result = await signUpWithEmail(data);
      console.log("result", result)
      if(result.success) router.push('/');
      console.log(data);
    } catch (err: any) {
      console.log(err);
      toast.error("Sign up failed", {
        description: err instanceof Error ? err.message : "failed to create an account",
      })
    }
  };
  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Please Enter your Name"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is Required", minlength: 2 }}
        />

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
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Please Enter Your Password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is Required", minlength: 8 }}
        />

        <CountrySelectField
          name="country"
          label="Country"
          error={errors.country}
          required
          control = {control}
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select Perfered Risk"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />



        <Button
          type="submit"
          onClick={() => console.log(" Button clicked!")}
          className="yellow-btn w-full mt-5"
          
        >
          {isSubmitting ? "Creating account" : "Let's Make Some Money"}
        </Button>
        <FooterLink text="Already have an account" linkText="Sign In" href="/sign-in" />
      </form>
    </>
  );
};

export default SignUp;
