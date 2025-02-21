"use client"
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'

function Navbar() {
  const { user } = useUser();
  console.log(user)
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center py-2 px-6 bg-white '>
        <div className="flex items-center space-x-2">
          <p className='font-bold text-3xl px-3 text-purple-950'>Skill Sort</p>
        </div>
        <div className='flex'>
        <SignedOut>
          <div className='bg-zinc-950 py-3 px-4 rounded-md'>
        <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
      <div className='flex items-center gap-4 '>
        <UserButton/>
        </div>
      
      </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Navbar
