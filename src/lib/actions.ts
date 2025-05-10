"use server";

import { z } from "zod";
import { nr1ComplianceChatbot, type Nr1ComplianceChatbotInput } from "@/ai/flows/nr1-compliance-chatbot";

// Schema for contact form data (matches client-side)
const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(500),
});

export async function handleContactFormSubmit(
  values: z.infer<typeof contactFormSchema>
): Promise<{ success: boolean; error?: string }> {
  // Validate data on server-side as well
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { 
      success: false, 
      error: "Dados inválidos: " + validatedFields.error.flatten().fieldErrors  
    };
  }

  // Simulate sending an email or saving to a database
  console.log("Form data received:", validatedFields.data);
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a potential error
  // if (Math.random() > 0.5) {
  //   return { success: false, error: "Falha simulada no servidor." };
  // }

  return { success: true };
}


export async function getChatbotResponse(
  userInput: string
): Promise<{ answer?: string; error?: string }> {
  if (!userInput || userInput.trim() === "") {
    return { error: "A entrada do usuário não pode estar vazia." };
  }

  try {
    const input: Nr1ComplianceChatbotInput = { query: userInput };
    const result = await nr1ComplianceChatbot(input);
    return { answer: result.answer };
  } catch (error) {
    console.error("Error calling nr1ComplianceChatbot:", error);
    return { error: "Desculpe, não consegui processar sua pergunta no momento." };
  }
}
