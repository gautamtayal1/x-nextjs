import { Card, CardFooter} from "@/components/ui/card"
import Image from "next/image"

import React from 'react'
import { Button } from "./ui/button"
import { ImageIcon } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
// import { auth} from "@clerk/nextjs/server"

async function createPost(formData: FormData) {
  "use server";

  const {id} = await currentUser()
  const content = formData.get("content") as string;
  if (!content?.trim()) {
    throw new Error("Post content cannot be empty");
  }
  await prisma.post.create({
    data: {
      content,
      userId: id
    },
  });
}

export default function MainCreatePost() {
return (

    <Card className="w-full mx-auto py-5 pl-5">
      <Image src="/logo.jpg" 
        width={30} 
        height={30} 
        alt="image" 
        className="rounded-3xl"/>
        <form action={createPost}>
        <div className="flex gap-3 ">
          <textarea
          name="content"
          placeholder="what's happening?"
          className="w-[97%] p-2 border rounded-md resize-none mb-3"/>
        </div>
    
          <CardFooter className="flex justify-between">
            <button>
            <ImageIcon />
            </button>
            <Button type="submit">Post</Button>
          </CardFooter>
        </form>
          
    </Card>

  )
}


