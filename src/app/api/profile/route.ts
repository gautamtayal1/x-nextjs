import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  const profiles = await prisma.user.findMany({})
  return NextResponse.json(profiles)
}