"use client";
import React, { useState } from "react";

interface JobDetails {
  description: string;
  location: string;
  salary: string;
  educationRequirement: string;
}

interface CandidateForm {
  name: string;
  experience: number;
  education: string;
  resume: File | null;
}

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidate, setCandidate] = useState<CandidateForm>({
    name: "",
    experience: 0,
    education: "",
    resume: null,
  });

  const jobDetails: JobDetails = {
    description: "Software Engineer responsible for building scalable applications.",
    location: "Remote",
    salary: "$80,000 - $100,000",
    educationRequirement: "Bachelor's in Computer Science",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCandidate({ ...candidate, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Candidate Data:", candidate);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mb-6 items-center">
        <p className="text-gray-700"><strong>Job Description:</strong> {jobDetails.description}</p>
        <p className="text-gray-700"><strong>Work Location:</strong> {jobDetails.location}</p>
        <p className="text-gray-700"><strong>Salary:</strong> {jobDetails.salary}</p>
        <div className="flex justify-center">
          <button className="mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition" onClick={() => setIsModalOpen(true)}>
            Apply Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)} >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply for this Job</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium">Candidate Name</label>
                <input type="text" title="name" name="name" value={candidate.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Work Experience (Years)</label>
                <input type="number" title="experience" name="experience" value={candidate.experience} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Education</label>
                <input type="text" title="education" name="education" value={candidate.education} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Upload Resume</label>
                <input type="file" title="resume" name="resume" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
