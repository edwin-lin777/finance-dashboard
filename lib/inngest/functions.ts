/*
import {inngest} from "@/lib/inngest/client"
import { step } from "inngest"
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts"
import { sendWelcomeEmail } from "../nodemailer"


export const sendSignUpEmail = inngest.createFunction(
    {id: 'sign-up-email'},
    {event: 'app/user.created'},
    async ({event,step}) => {
        const userProfile=`
            -Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk Tolerance: ${event.data.riskTolerance}
            
        
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

        const response = await step.ai.infer('generate-welcome-info', {
    model: step.ai.models.openai({ model: 'gpt-5' }),
    body: {
        contents: [
            {
                role: 'user',
                parts: [
                    { text: prompt }
                ]
            }
        ]
    }
});

    await step.run('send-welcome-email', async () => {
        const part = response.candidates?.[0]?.content?.parts?.[0];
        const introText = (part && 'text' in part ? part.text : null) || `thx for joining. Let's make some money.`

        const {data: {email, name}} = event;
        return await sendWelcomeEmail({
            email,
            name,
            intro: introText,
        })
    })

    return {
        success:true,
        message: 'Welcome email sent!'
        
    }

    } 

)

*/
