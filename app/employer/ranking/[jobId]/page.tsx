"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Application } from "@prisma/client";
import { useParams } from "next/navigation"; 
export default function JobSubmissions() {
  const { jobId } = useParams(); 
  const [rankedCandidates, setRankedCandidates] = useState<Application[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !jobId) return;

    async function fetchRankedCandidates() {
      setLoading(true);
      try {
        const response = await fetch("/api/rankCandidates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId }),
        });

        if (!response.ok) throw new Error("Failed to fetch candidates");
        
        const data = await response.json();
        if (data.rankedCandidates) setRankedCandidates(data.rankedCandidates);
      } catch (error) {
        console.error("Error fetching ranked candidates:", error);
      }
      setLoading(false);
    }

    fetchRankedCandidates();
  }, [user, jobId]);

  return (
    <div className="p-4 w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Ranked Job Applications</h2>
      {loading ? <p>Loading...</p> : null}
      <div>
        {rankedCandidates.length > 0 ? (
          rankedCandidates.map((app, index) => (
            <div key={app.id} className="border-b py-2">
              <div><strong>#{index + 1}</strong> {app.name}</div>
              <div><strong>Education:</strong> {app.education}</div>
              <div><strong>Experience:</strong> {app.experience} years</div>
              <div>
                <strong>Resume:</strong> <a href={app.resumeUrl} target="_blank" className="text-blue-500 underline">View Resume</a>
              </div>
            </div>
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
}
