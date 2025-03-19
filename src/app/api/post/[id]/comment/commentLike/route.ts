import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(req: Request) {
  try {
    const {commentId, action} = await req.json()
    const post = await prisma.comment.update({
      where: {id: commentId},
    data: {likes: action === "like" ? {increment: 1} : {decrement: 1}}
  })
  return NextResponse.json(post, {status:201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Internal server error"}, {status: 500})
  }
}