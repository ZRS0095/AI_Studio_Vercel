// FILE: services/geminiService.ts
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Task, EvaluationResult, FinalReport } from "../types";

// Використовуємо швидку та безплатну модель Flash для всіх завдань

const FLASH_MODEL = 'models/gemini-2.5-flash';



/**
 * Ініціалізує клієнт AI. 
 */
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    throw new Error("API_KEY_MISSING: Ключ не знайдено. Будь ласка, додайте його у файл .env або оберіть у системі.");
  }
  return new GoogleGenAI({ apiKey });
};

// --- SCHEMAS ---

const evaluationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: "Integer from 0 to 100" },
    feedback: { type: Type.STRING, description: "Ukrainian text explaining violations or success" },
    isSuccess: { type: Type.BOOLEAN },
    securityViolation: { type: Type.BOOLEAN }
  },
  required: ["score", "feedback", "isSuccess", "securityViolation"]
};

const tutorialSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    passed: { type: Type.BOOLEAN },
    feedback: { type: Type.STRING, description: "Hint in Ukrainian what is missing" }
  },
  required: ["passed", "feedback"]
};

const finalReportSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    total_score: { type: Type.NUMBER },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          task_id: { type: Type.STRING },
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING }
        },
        required: ["task_id", "score", "feedback"]
      }
    }
  },
  required: ["total_score", "strengths", "weaknesses", "recommendations", "items"]
};

// --- SERVICES ---

export const validateTutorialPrompt = async (
  userPrompt: string
): Promise<{ passed: boolean; feedback: string }> => {
  try {
    const ai = getAIClient();
    const systemInstruction = `
You are a strictly automated Prompt Validator.
User must write a prompt that includes 5 SPECIFIC REQUIREMENTS.
Return JSON. feedback in Ukrainian.
    `.trim();

    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Evaluate this user input as a prompt: ${userPrompt}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: tutorialSchema,
        temperature: 0.0
      }
    });

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Tutorial check failed:", error);
    return { 
      passed: false, 
      feedback: `Помилка зв'язку: ${error.message || "Невідома помилка API"}` 
    };
  }
};

export const evaluateSubmission = async (task: Task, userPrompt: string): Promise<EvaluationResult> => {
  try {
    const ai = getAIClient();
    const systemInstruction = `
You are a strict AI Governance Auditor. 
Evaluate if the user wrote a WORKING PROMPT to solve the business scenario.
Feedback in Ukrainian. Strictly detect copying and lack of instructions.
PII leaks must result in score 0 and securityViolation=true.
    `.trim();

    const prompt = `
Task: ${task.title}
Scenario: ${task.scenario}
Constraints: ${task.constraints.join(', ')}
DoD: ${task.success_criteria}
User Prompt: "${userPrompt}"
    `.trim();

    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: evaluationSchema,
        temperature: 0.1
      }
    });

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Evaluation error:", error);
    return { 
      score: 0, 
      feedback: `Помилка аналізу: ${error.message || "Перевірте API ключ та підключення до мережі."}`, 
      isSuccess: false, 
      securityViolation: false 
    };
  }
};

export const generateFinalReport = async (tasks: Task[], answers: Record<string, string>): Promise<FinalReport> => {
  try {
    const ai = getAIClient();
    const dataToAnalyze = tasks.map(t => ({
      id: t.id,
      title: t.title,
      prompt: answers[t.id] || "No answer"
    }));

    const systemInstruction = `
You are a Senior Prompt Engineer. Analyze the collection of user prompts.
Identify overall strengths, weaknesses, and provide 3-5 growth recommendations.
Output JSON. Language: Ukrainian.
    `.trim();

    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Evaluate test session: ${JSON.stringify(dataToAnalyze)}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: finalReportSchema,
        temperature: 0.2
      }
    });

    const report = JSON.parse(response.text);
    return {
      ...report,
      session_id: Date.now().toString(),
      user_name: "Student",
      department: "General"
    };
  } catch (error: any) {
    console.error("Report error:", error);
    throw new Error(`Не вдалося згенерувати звіт: ${error.message}`);
  }
};