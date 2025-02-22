import { NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req: Request) {
  try {
    const { jobDescription, candidates } = await req.json();

    if (!jobDescription || !Array.isArray(candidates) || candidates.length === 0) {
      return NextResponse.json({ error: "Invalid job description or candidates list" }, { status: 400 });
    }

    const prompt = `
      You are an AI hiring assistant. Your task is to rank candidates for a job.

      **Job Description:**
      ${jobDescription}

      **Candidates:**
      ${candidates
        .map(
          (c, index) =>
            `${index + 1}. Name: ${c.name}, Experience: ${c.experience} years, Education: ${c.education}`
        )
        .join("\n")}

      **Ranking Criteria:**
      - More experience = Higher rank.
      - Relevant education = Higher rank.
      - Better match with job description = Higher rank.

      **Output Format (JSON):**
      {
        "rankedCandidates": [
          { "name": "Candidate Name", "score": 9.2 },
          { "name": "Another Candidate", "score": 8.7 }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [{ role: "system", content: "You are a professional hiring assistant." }, { role: "user", content: prompt }],
      temperature: 0.3, 
    });

    let rankedCandidates = [];
    
    try {
      rankedCandidates = JSON.parse(response.choices[0].message.content || "{}").rankedCandidates || [];
    } catch (parseError) {
      console.error("Error parsing LLM response:", parseError);
    }

    return NextResponse.json({ success: true, rankedCandidates });
  } catch (error) {
    console.error("LLM Error:", error);
    return NextResponse.json({ error: "Error processing candidates" }, { status: 500 });
  }
}
