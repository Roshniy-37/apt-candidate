'use client'
import { submitApplication } from '@/actions/route'
import React, { useEffect, useState } from 'react'

function Page({
    params,
  }: {
    params: Promise<{ jobId: string }>
  }) {
    const [jobId, setJobId] = useState('')
    const [name, setName] = useState('')
    const [experience, setExperience] = useState('')
    const [education, setEducation] = useState('')
    const [resume, setResume] = useState('')
    
    useEffect(()=>{
      async function fetchData(){
        const slug = (await params).jobId;
        setJobId(slug);

      }

      fetchData()
    }, [])


    const handleSubmit = async () => {
      if(!jobId){
        return
      }
      if(!name || !experience || !education || !resume){
        alert('Please fill all fields')
        return
      }

      const res = await submitApplication(jobId, name, parseInt(experience), education, resume)
      if(res)
      alert('Submitted')
    }
    
  return (
    <div className='p-6 bg-gray-900 min-h-screen dark'>
      <h1 className='text-2xl font-bold mb-4'>Apply for Job</h1>
      <div className='flex flex-col gap-4 text-black'>
        <input 
          type="text" 
          placeholder='Name' 
          className='w-1/2 p-2 border border-gray-300 rounded'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Experience' 
          className='w-1/2 p-2 border border-gray-300 rounded'
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Education' 
          className='w-1/2 p-2 border border-gray-300 rounded'
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Resume URL' 
          className='w-1/2 p-2 border border-gray-300 rounded'
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
        <button 
        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
        onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Page
