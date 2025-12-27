import { Inngest} from "inngest";

export const inngest = new Inngest({
    id: 'financedashboard',
    ai: { openai: { apiKey: process.env.OPENAI_KEY! }}
})