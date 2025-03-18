import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    const { id } = await params
    
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}