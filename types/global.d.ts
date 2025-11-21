export {};
declare global {
    interface SignInFormData {
        email: string;
        password: string;
    }

    interface SignUpFormData {
        fullName: string;
        email:string;
        password: string;
        country: string;
        investmentGoals: string;
        riskTolerance: string;
        perferredIndustry: string;
    }

    interface WelcomeEmailData {
        email: string;
        name: string;
        intro: string;
    }

}