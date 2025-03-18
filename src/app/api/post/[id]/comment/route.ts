import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}: {params: {id: string}}) {
  try {
    const {content} = await req.json()
    const {id} = await params
    await prisma.comment.create({
      data: {
        postId: parseInt(id), content
      }
    })
    return NextResponse.json({message: "comment added"}, {status:201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Internal server error"}, {status: 500})
  }
}

export async function GET(req, {params}) {
  try {
    const {id} = await params
    await prisma.comment.findMany({
      where: {
        postId: parseInt(id)
      }, include: { post: {include: {user:true}}}
    })
    return NextResponse.json({message: "comments received"}, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Internal server error: " + error}, {status: 500})
  }
}