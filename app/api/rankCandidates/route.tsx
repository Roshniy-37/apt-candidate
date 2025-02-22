import { NextResponse } from "next/server";
import { getSubmissions } from "@/actions/route";
import { rankCandidates } from "@/app/api/rankCandidates/ml";

export async function POST(req: Request) {
  try {
    const { jobId } = await req.json();
    if (!jobId) return NextResponse.json({ error: "Job ID is required" }, { status: 400 });

    const applications = await getSubmissions(jobId) || [];  // ✅ Ensure it's an array
    if (applications.length === 0) return NextResponse.json({ error: "No applications found" }, { status: 404 });

    const rankedCandidates = await rankCandidates(applications);

    return NextResponse.json({ rankedCandidates });
  } catch (error) {
    console.error("Error ranking candidates:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
