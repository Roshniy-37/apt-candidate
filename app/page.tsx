import React from 'react'
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find the Right Talent, Instantly
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Skill Sort helps employers rank candidates based on job requirements,
            making hiring easier and faster.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>

        <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <img src="/landing-image.png" alt="Hiring process" className="w-full max-w-md rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
    </>
  );
}
