"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Find the Right Talent, Instantly
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Skill Sort helps employers rank candidates based on job
              requirements, making hiring easier and faster.
            </p>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
              onClick={() => {
                router.push(`/employer/${user?.username}`);
              }}
            >
              <User size={20} className="mr-2" /> Get Started
            </button>
          </div>

          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <img
              src="/hiring.jpg"
              alt="Hiring process"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
