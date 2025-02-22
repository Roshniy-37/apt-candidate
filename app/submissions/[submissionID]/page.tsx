"use client";

import { createUser, getSubmissions } from "@/actions/route";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Application } from "@prisma/client";

export default function JobSubmissions({ jobId }: { jobId: string }) {
  const [search, setSearch] = useState("");
  const [submissions, setSubmissions] = useState<Application[]>([]);
  const { user } = useUser();
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);

  useEffect(() => {
    if (!user || !jobId) return;

    const email = user.emailAddresses[0]?.emailAddress || "";
    const name = user.fullName || user.username || "NA";

    async function fetchData() {
      await createUser({ email, name });
      const res = await getSubmissions(jobId);
      if (res) {
        setSubmissions(res);
        setFilteredApps(res);
      }
    }

    fetchData();
  }, [user, jobId]); // jobId included in dependencies

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredApps(
      submissions.filter((app) =>
        app.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto mt-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Job Applications</h2>
      <input
        type="text"
        placeholder="Search by applicant name..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <div key={app.id} className="border-b py-3">
              <div><strong>Name:</strong> {app.name}</div>
              <div><strong>Education:</strong> {app.education}</div>
              <div><strong>Experience:</strong> {app.experience}</div>
              <div>
                <strong>Resume:</strong>{" "}
                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Resume
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No applications found.</p>
        )}
      </div>
    </div>
  );
}
