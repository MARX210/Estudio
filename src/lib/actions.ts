"use server";

import { z } from "zod";
import { nr1ComplianceChatbot, type Nr1ComplianceChatbotInput, type Nr1ComplianceChatbotOutput } from "@/ai/flows/nr1-compliance-chatbot";

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
    const result: Nr1ComplianceChatbotOutput = await nr1ComplianceChatbot(input);

    if (result && typeof result.answer === 'string') {
      return { answer: result.answer };
    } else {
      // This case should ideally not be reached if the flow behaves as expected.
      console.error("Unexpected response structure from nr1ComplianceChatbot:", result);
      return { error: "Resposta inesperada do assistente. Por favor, tente novamente." };
    }
  } catch (error) {
    console.error("Error in getChatbotResponse calling nr1ComplianceChatbot:", error);
    let message = "Desculpe, ocorreu um problema ao comunicar com o assistente. Tente novamente mais tarde.";
    
    if (error instanceof Error) {
      // Example of checking for a more specific error, e.g. API key issues.
      // The exact error message string from the API/SDK might vary.
      if (error.message.toLowerCase().includes("api key") && error.message.toLowerCase().includes("valid")) {
        message = "Erro de configuração do assistente. Verifique a chave de API e tente novamente.";
      } else if (error.message.toLowerCase().includes("quota")) {
        message = "Limite de uso do assistente atingido. Por favor, tente novamente mais tarde.";
      }
    }
    return { error: message };
  }
}

