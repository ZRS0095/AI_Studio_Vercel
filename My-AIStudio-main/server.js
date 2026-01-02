import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const RESULTS_FILE = path.join(__dirname, 'results.json');

const saveResult = (result) => {
  try {
    const entry = JSON.stringify(result) + '\n';
    fs.appendFileSync(RESULTS_FILE, entry, 'utf8');
  } catch (err) {
    console.error("Error writing to results file:", err);
  }
};

app.post('/api/evaluate', async (req, res) => {
  const { answers } = req.body;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const finalReportSchema = {
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate batch: ${JSON.stringify(answers)}`,
      config: {
        systemInstruction: "You are a Senior AI Auditor. Evaluate batch of answers. JSON only. Ukrainian.",
        responseMimeType: "application/json",
        responseSchema: finalReportSchema,
        temperature: 0.1
      }
    });

    const reportData = JSON.parse(response.text);
    saveResult(reportData);
    res.json(reportData);
  } catch (error) {
    console.error("Evaluation Error:", error);
    res.status(500).json({ error: "Failed to evaluate" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});