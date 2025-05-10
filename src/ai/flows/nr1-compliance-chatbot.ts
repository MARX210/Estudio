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
  prompt: `You are a helpful AI chatbot that answers questions about NR-1 compliance and provides initial risk assessment guidelines.
  Use the following information to answer the user's query:
  - NR-1 is a Brazilian regulatory standard related to occupational safety and health management.
  - It requires organizations to identify, evaluate, and manage psychosocial risks in the workplace.
  - Psychosocial risks include stress, burnout, harassment, and excessive pressure.
  - Compliance with NR-1 helps organizations create healthy and productive work environments.
  - Risk assessment involves identifying potential hazards and evaluating their impact on employee well-being.
  - Organizations should implement preventive measures and action plans to mitigate identified risks.
  - Consulting with specialists in occupational psychology can help ensure compliance and effective risk management.

  Query: {{{query}}}`,
});

const nr1ComplianceChatbotFlow = ai.defineFlow(
  {
    name: 'nr1ComplianceChatbotFlow',
    inputSchema: Nr1ComplianceChatbotInputSchema,
    outputSchema: Nr1ComplianceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
