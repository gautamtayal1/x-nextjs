import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }
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