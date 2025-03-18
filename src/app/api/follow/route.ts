import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const {id} = await currentUser()
    const posts = await prisma.follow.findMany({
      where: {
        fromUserId: id
      }
    })
    return NextResponse.json({message: "get success", data: posts})
  } catch (error) {
    console.log(error)
  }
}

export async function POST(req:Request) {
  try {
    const {id} = await currentUser()
    const { toUserId } = await req.json()

    const existingFollow = await prisma.follow.findFirst({
      where:{
        fromUserId: id,
        toUserId
      }
    })

    if(existingFollow) return NextResponse.json({messag:"already following"})
      
    await prisma.follow.create({
      data:{
        fromUserId: id,
        toUserId
      }
    })
    return NextResponse.json({message: "Followed"})
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(req:Request) {
  try {
    const {id} = await currentUser()
    const {toUserId} = await req.json()

    const existingFollow = await prisma.follow.findFirst({
      where:{
        fromUserId: id,
        toUserId
      }
    })

    if(!existingFollow) return NextResponse.json({error: "follow relation not found"})

  await prisma.follow.delete({
    where:{
      id: existingFollow.id
    }
  })
  return NextResponse.json({message: "Unfollowed"})
  } catch (error) {
    console.log(error)
  }
  
}

