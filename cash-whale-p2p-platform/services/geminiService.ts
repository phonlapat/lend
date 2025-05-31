
import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters } from "@google/genai";

// API Key is sourced from environment variables.
// IMPORTANT: process.env.API_KEY is expected to be set in the deployment environment.
// Do NOT hardcode the API key here or define process.env.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(
    "Gemini API Key is not configured. Please set the API_KEY environment variable. AI features will not work."
  );
  // In a real production app, you might throw an error or have a more robust fallback.
  // For this exercise, we proceed, and calls will fail if API_KEY is truly missing.
}

// Initialize the GoogleGenAI client. The non-null assertion (!) is used because
// we expect API_KEY to be defined in a valid environment.
const ai = new GoogleGenAI({ apiKey: API_KEY! });

const TEXT_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
// const IMAGE_MODEL_NAME = 'imagen-3.0-generate-002'; // For future image generation features

/**
 * Generates text content using the Gemini API.
 * @param prompt The text prompt for the model.
 * @param systemInstruction Optional system instruction for the model.
 * @returns A promise that resolves to the generated text.
 */
export const generateTextContent = async (prompt: string, systemInstruction?: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject(new Error("Gemini API Key is not configured."));
  }
  try {
    const params: GenerateContentParameters = {
      model: TEXT_MODEL_NAME,
      contents: prompt, 
    };
    if (systemInstruction) {
      params.config = { systemInstruction };
    }

    const response: GenerateContentResponse = await ai.models.generateContent(params);
    // As per prompt guidance, response.text should provide the direct string output.
    return response.text;
  } catch (error) {
    console.error("Error generating text content with Gemini:", error);
    if (error instanceof Error) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred with the Gemini API during text generation.");
  }
};


/**
 * Generates content and expects a JSON response from the Gemini API.
 * @param prompt The text prompt for the model.
 * @param systemInstruction Optional system instruction for the model.
 * @returns A promise that resolves to the parsed JSON object.
 */
export const generateJsonContent = async <T,>(prompt: string, systemInstruction?: string): Promise<T> => {
  if (!API_KEY) {
    return Promise.reject(new Error("Gemini API Key is not configured."));
  }
  try {
    const params: GenerateContentParameters = {
        model: TEXT_MODEL_NAME,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    };
    if (systemInstruction) {
       params.config = { ...params.config, systemInstruction };
    }
    
    const response: GenerateContentResponse = await ai.models.generateContent(params);
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    return JSON.parse(jsonStr) as T;
  } catch (error) {
    console.error("Error generating JSON content with Gemini:", error);
    if (error instanceof Error) {
      throw new Error(`Gemini API JSON Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating JSON with the Gemini API.");
  }
};

// Example of using thinkingConfig (can be added to generateTextContent if needed)
// config: { thinkingConfig: { thinkingBudget: 0 } } // To disable thinking for low latency
// Omit thinkingConfig for higher quality (default). Only for gemini-2.5-flash-preview-04-17.
