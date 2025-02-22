'use server'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function createUser({email, name}: {email: string, name: string}){
    const res = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if(res){
        return null;
    }
    return await prisma.user.create({
        data: {
            name,
            email,
        }
    })
}



export async function createJob(email: string, title: string, location: string, salary: number, education: string, description: string){
    const res = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if(!res){
        return 
    }

    return await prisma.job.create({
        data: {
            title,
            location,
            salary,
            education,
            description,
            userId: res.id
        }
    })
}

export async function getJobs(email: string){
    const res = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if(!res){
        return 
    }

    return await prisma.job.findMany({
        where: {
            userId: res.id
        }
    })
}


export async function submitApplication(jobId: string, name: string, experience: number, education: string, resume: string){
    return await prisma.application.create({
        data: {
            jobId,
            name,
            experience,
            education,
            resumeUrl: resume,
            rank: 0
        }
    })
}

export async function getSubmissions(jobId: string) {
    const data = await prisma.application.findMany({ where: { jobId } });
    return data || [];  
  }