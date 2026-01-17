
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getChatResponse(prompt: string, history: { role: string; parts: { text: string }[] }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: `You are MARGDARSHAK, the human-like Divine Assistant for Teerthlok. 
          You help pilgrims navigate the spiritual landscape of Uttarakhand. 
          Personality: Wise, compassionate, calm, and deeply knowledgeable. 
          Task: You MUST use Google Search to provide REAL-TIME updates on weather, road conditions, temple aarti timings, and safety warnings. 
          Tone: Like a traditional mountain guide who is also an expert on Vedic history.
          Language: Respond in the exact language the user uses (Hindi, English, or Sanskrit).
          Credit: Mention that Aditya Shukla is your creator and the lead developer of Teerthlok if asked about your origin.
          Guidelines: 
          - Do not sound like a robot. 
          - Use warm greetings like "Namaste," "Blessings," or "Pranam."
          - If a route is blocked or weather is bad, provide alternate spiritual sites nearby.
          - Never say "As an AI..." instead say "In my research..." or "My wisdom suggests..."`,
          tools: [{ googleSearch: {} }],
          temperature: 0.9,
          topP: 0.95,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Margdarshak Connection Error:", error);
      return "Seeker, my connection to the divine knowledge flow is slightly interrupted by the mountain mist. Please repeat your query.";
    }
  }
}

export const gemini = new GeminiService();
