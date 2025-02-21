'use client'
import { useState } from "react";

interface Candidate {
  name: string;
  rank: number;
  responses: string[];
  details: string;
}

interface Job {
  profile: string;
  description: string;
  formLink: string;
  submissions: number;
  candidates: Candidate[];
}

const jobsData: Job[] = [
  {
    profile: "Software Engineer",
    description: "Develop and maintain web applications.",
    formLink: "https://example.com/job1",
    submissions: 25,
    candidates: [
      { name: "Alice Johnson", rank: 1, responses: ["Resume", "Cover Letter"], details: "Alice has 5 years of experience in React.js and Node.js." },
      { name: "Bob Smith", rank: 2, responses: ["Resume", "Portfolio"], details: "Bob is skilled in backend development with Django and PostgreSQL." },
    ],
  },
  {
    profile: "Data Scientist",
    description: "Analyze large datasets and build predictive models.",
    formLink: "https://example.com/job2",
    submissions: 18,
    candidates: [
      { name: "Charlie Brown", rank: 1, responses: ["Resume", "GitHub Projects"], details: "Charlie specializes in NLP and machine learning models." },
      { name: "Eve Adams", rank: 2, responses: ["Resume", "Research Papers"], details: "Eve has experience with deep learning and TensorFlow." },
    ],
  },
];

export default function EmployerDashboard() {
  const [open, setOpen] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>(jobsData);
  const [createOpen, setCreateOpen] = useState(false);
  const [newJob, setNewJob] = useState<Job>({
    profile: "",
    description: "",
    formLink: "",
    submissions: 0,
    candidates: [],
  });
  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const [selectedJobCandidates, setSelectedJobCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleOpen = (candidates: Candidate[]) => {
    setSelectedCandidates(candidates);
    setOpen(true);
  };

  const handleCreateJob = () => {
    setJobs([...jobs, newJob]);
    setCreateOpen(false);
    setNewJob({ profile: "", description: "", formLink: "", submissions: 0, candidates: [] });
  };

  const handleSubmissionsOpen = (candidates: Candidate[]) => {
    setSelectedJobCandidates(candidates);
    setSubmissionsOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6 border-b pb-4 bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Employer Dashboard</h1>
        <button 
          onClick={() => setCreateOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
        >
          Create Job
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Job Profile</th>
              <th className="p-4 text-left">Job Description</th>
              <th className="p-4 text-left">Form Link</th>
              <th className="p-4 text-left">Submissions</th>
              <th className="p-4 text-left">Ranks</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="p-4 font-medium text-gray-700">{job.profile}</td>
                <td className="p-4 text-gray-600">{job.description}</td>
                <td className="p-4 text-blue-500 underline">
                  <a href={job.formLink} target="_blank" rel="noopener noreferrer">Apply Here</a>
                </td>
                <td className="p-4 text-center font-semibold text-gray-700">
                  <button onClick={() => handleSubmissionsOpen(job.candidates)}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded transition duration-200">
                    View Submissions
                  </button>
                </td>
                <td className="p-4">
                  <button onClick={() => handleOpen(job.candidates)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200">
                    View Ranks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissionsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Candidate Submissions</h2>
            <ul className="divide-y">
              {selectedJobCandidates.map((candidate, index) => (
                <li key={index} className="p-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-200"
                  onClick={() => setSelectedCandidate(candidate)}>
                  {candidate.name}
                </li>
              ))}
            </ul>
            <button onClick={() => setSubmissionsOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition duration-200">
              Close
            </button>
          </div>
        </div>
      )}

      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selectedCandidate.name}'s Details</h2>
            <p className="text-gray-700 mb-2">Rank: {selectedCandidate.rank}</p>
            <p className="text-gray-700 mb-2">Details: {selectedCandidate.details}</p>
            <button onClick={() => setSelectedCandidate(null)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition duration-200">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
