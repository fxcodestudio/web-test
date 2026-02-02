import { GoogleGenAI } from "@google/genai";

export const askConcierge = async (question: string): Promise<string> => {
  try {
    // Initialize inside the function to capture the latest process.env.API_KEY 
    // after the user selects it in the UI.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest',
      contents: question,
      config: {
        systemInstruction: `You are the mysterious and elegant concierge of "Strange Stay" (이상한 스테이). 
        The hotel has a modern, minimalist, and slightly surreal Instagram aesthetic.
        Keep your answers short, poetic, and witty. Use Korean language.
        Do not answer questions unrelated to travel, relaxation, or the hotel vibe.`,
      },
    });

    return response.text || "죄송합니다. 지금은 연결이 불안정하네요.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "지금은 잠시 명상 중입니다. 나중에 다시 말을 걸어주세요.";
  }
};