'use client'

import { getSubmissions } from '@/actions/route' 
import { useParams } from 'next/navigation' 
import React, { useEffect, useState } from 'react'

type Submission = {
  id: string;
  jobId: string;
  name: string;
  experience: number;
  education: string;
  resumeUrl: string;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
};

function SubmissionsPage() {
  const params = useParams(); 
  const jobId = Array.isArray(params.jobId) ? params.jobId[0] : params.jobId; 

  const [submissions, setSubmissions] = useState<Submission[]>([]); 

  useEffect(() => {
    if (!jobId) return;

    async function fetchSubmissions() {
      const res: Submission[] = await getSubmissions(jobId as string); 
      if (res) {
        setSubmissions(res);
      }
    }

    fetchSubmissions();
  }, [jobId]);

  return (
    <div className='p-6 bg-gray-900 min-h-screen text-white'>
      <h1 className='text-2xl font-bold mb-4'>Submissions for Job ID: {jobId}</h1>

      {submissions.length > 0 ? (
        <table className="w-full bg-gray-800 rounded-lg">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Education</th>
              <th className="p-4 text-left">Resume</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-t border-gray-600">
                <td className="p-4">{submission.name}</td>
                <td className="p-4">{submission.experience} years</td>
                <td className="p-4">{submission.education}</td>
                <td className="p-4">
                  <a href={submission.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View Resume</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-400">No submissions found.</p>
      )}
    </div>
  );
}

export default SubmissionsPage;
