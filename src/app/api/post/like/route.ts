import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(req: Request) {
  const {cardId, action} = await req.json()
  try {
    await prisma.post.update({
      where:{ id: cardId},
      data: { likes: action === 'like' ? {increment: 1} : {decrement: 1}}
    })
    return NextResponse.json({message: "Liked"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Error"})
  }
}
