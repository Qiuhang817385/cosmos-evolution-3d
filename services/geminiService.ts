import { GoogleGenAI } from "@google/genai";
import { CosmicStage, StageInfo } from '../types';

// Initialize Gemini conditionally
let ai: GoogleGenAI | null = null;
try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (e) {
  console.warn("Gemini API Key missing or invalid, falling back to static text.");
}

export const fetchNarrative = async (stage: CosmicStage, baseInfo: StageInfo): Promise<string> => {
  if (!ai) {
    return baseInfo.description;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Tell me a short, poetic, and scientifically accurate description of the "${baseInfo.title}" stage of the universe in Chinese (Simplified). Keep it under 80 words. Focus on the visual and emotional grandeur.`,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || baseInfo.description;
  } catch (error) {
    console.error("Gemini fetch failed", error);
    return baseInfo.description;
  }
};
