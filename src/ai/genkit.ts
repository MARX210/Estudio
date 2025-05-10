import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  // Updated model to a known-working and recent model.
  // Ensure GOOGLE_GENAI_API_KEY is set in your .env file.
  model: 'gemini-1.5-flash-latest', 
});

