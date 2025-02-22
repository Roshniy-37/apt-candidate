"use client";
import { createJob, createUser, getJobs } from "@/actions/route";
import { useUser } from "@clerk/nextjs";
import { Job } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from 'next/link'


export default function EmployerDashboard() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>();
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('10000')
  const [education, setEducation] = useState('')
  const [description, setDesc] = useState('')
  const [createOpen, setCreateOpen] = useState(false);
 

  const [rankModalOpen, setRankModalOpen] = useState(false);

  const handleCreateJob = async () => {
    if(!user){
      return
    }
    const email = user.emailAddresses[0].emailAddress;
    const res = await createJob(email, title, location, parseInt(salary), education, description)
    console.log(res)
    alert("Done")
    setCreateOpen(false);
  };




  useEffect(()=>{
    if(!user){
      return
    }
    const email = user.emailAddresses[0].emailAddress;
    const name = user.fullName || user.username || "NA";
    async function getUser(){
      await createUser({ email, name})
      const res = await getJobs(email);
      setJobs(res)
    }
    getUser()

  }, [user])





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
            {jobs && jobs.map((job, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="p-4 font-medium text-gray-700">{job.title}</td>
                <td className="p-4 text-gray-600">{job.description}</td>
                <td className="p-4 text-blue-500 underline">
                  <a href={`apply/${job.id}`} target="_blank" rel="noopener noreferrer">Apply Here</a>
                </td>
                <td className="p-4 text-center font-semibold text-gray-700">
                 <Link href={`/submissions/${job.id}`}>
                  <button className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded transition duration-200">
                    View Submissions
                  </button>
                </Link>
                </td>
                <td className="p-4">
                <Link href={`/ranking/${job.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200">
                    View Ranks
                  </button>
                </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Job</h2>
            <input type="text" placeholder="Job Profile" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-2 p-2 border rounded" />
            <textarea placeholder="Job Description" value={description} onChange={(e) => setDesc(e.target.value)} className="w-full mb-2 p-2 border rounded" />
            <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mb-2 p-2 border rounded" />

            <div className="flex justify-end mt-4">
              <button onClick={() => setCreateOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded transition duration-200 mr-2">Cancel</button>
              <button onClick={handleCreateJob}  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200">Submit</button>
            </div>
          </div>
        </div>
      )}

      {rankModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Candidate Rankings</h2>
            
              <p  className="text-gray-800 mb-2">Name (Rank:)</p>
            
            <button onClick={() => setRankModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition duration-200">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
