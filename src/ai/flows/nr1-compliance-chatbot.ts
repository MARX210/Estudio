// src/ai/flows/nr1-compliance-chatbot.ts
'use server';

/**
 * @fileOverview An AI chatbot for answering questions about NR-1 compliance and providing initial risk assessment guidelines.
 *
 * - nr1ComplianceChatbot - A function that handles the chatbot interaction.
 * - Nr1ComplianceChatbotInput - The input type for the nr1ComplianceChatbot function.
 * - Nr1ComplianceChatbotOutput - The return type for the nr1ComplianceChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const Nr1ComplianceChatbotInputSchema = z.object({
  query: z.string().describe('The user query about NR-1 compliance or risk assessment.'),
});
export type Nr1ComplianceChatbotInput = z.infer<typeof Nr1ComplianceChatbotInputSchema>;

const Nr1ComplianceChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type Nr1ComplianceChatbotOutput = z.infer<typeof Nr1ComplianceChatbotOutputSchema>;

export async function nr1ComplianceChatbot(input: Nr1ComplianceChatbotInput): Promise<Nr1ComplianceChatbotOutput> {
  return nr1ComplianceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nr1ComplianceChatbotPrompt',
  input: {schema: Nr1ComplianceChatbotInputSchema},
  output: {schema: Nr1ComplianceChatbotOutputSchema},
  prompt: `You are an expert AI assistant specializing in Brazilian Regulatory Standard NR-1, focusing on occupational safety, health management, and psychosocial risks in the workplace. Your goal is to provide comprehensive, accurate, and helpful answers regarding NR-1 compliance and initial risk assessment guidelines.

You should draw upon your extensive knowledge base about Brazilian labor laws, NR-1 specifics, best practices for managing psychosocial risks (such as stress, burnout, harassment), and creating healthy work environments.

When responding to the user's query, provide detailed and actionable information. If the query is vague, ask for clarification. If the query is outside the scope of NR-1 or psychosocial risks, politely indicate that you are specialized in these areas but can try to provide general information if relevant or guide the user to appropriate resources.

User Query: {{{query}}}

Provide a clear, well-structured, and informative answer. Use bullet points or numbered lists for complex information if it enhances readability.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
});

const nr1ComplianceChatbotFlow = ai.defineFlow(
  {
    name: 'nr1ComplianceChatbotFlow',
    inputSchema: Nr1ComplianceChatbotInputSchema,
    outputSchema: Nr1ComplianceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      // This case should ideally be handled by the model generating a valid output according to the schema.
      // If output is null/undefined, it might indicate an issue with the model or prompt.
      // Returning a generic error or a message asking to rephrase.
      return { answer: "Desculpe, não consegui gerar uma resposta. Por favor, tente reformular sua pergunta." };
    }
    return output;
  }
);

