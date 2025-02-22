import OpenAI from "openai";
import dotenv from "dotenv";
import { Application } from "@prisma/client";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function rankCandidates(applications: Application[]) {
  if (!applications.length) return [];

  const prompt = `
    You are an AI hiring assistant. Rank the following job candidates based on their education and experience.
    Higher education levels (PhD > Masters > Bachelors) and more years of experience should be given preference.
    Return a JSON array sorted by best fit.

    Candidates:
    ${applications.map((app, i) => `Candidate ${i + 1}: ${JSON.stringify(app)}`).join("\n")}

    Output format:
    [
      { "id": "application_id", "fitScore": 0-100 },
      ...
    ]
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const rankedData = response.choices[0]?.message?.content;
    if (!rankedData) throw new Error("No ranking data received");

    const rankingArray = JSON.parse(rankedData);
    if (!Array.isArray(rankingArray)) throw new Error("Invalid response format");

    return applications
      .map((app) => ({
        ...app,
        fitScore: rankingArray.find((r) => r.id === app.id)?.fitScore ?? 50,
      }))
      .sort((a, b) => b.fitScore - a.fitScore);

  } catch (error) {
    console.error("OpenAI API error:", error);
    return applications.map((app) => ({ ...app, fitScore: 50 }));
  }
}
