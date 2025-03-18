"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Heart, MessageCircle} from "lucide-react"
import Image from "next/image"

export const PostCard = (
  {id, 
  content, 
  likes, 
  createdAt, 
  userId, 
  name, 
  username,
  profilePhoto
 }) => {
  return (
    <Card className="w-[92%] mx-auto my-5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Image src={profilePhoto} 
          width={25} 
          height={25}
          alt="profilePhoto"
          className="rounded"/>
          <CardTitle>{name}</CardTitle>

          <CardDescription>@{username}</CardDescription>
        </div>
        
      </CardHeader>
      <CardContent>
        <p>{content}
        </p>
      </CardContent>
      <CardFooter className="flex gap-3">
        <div className="flex gap-1 justify-center items-center">
          <Heart 
          size={20}
          fill="red"/>
          <p>{likes}</p>
        </div>
        
        <MessageCircle 
        size={20}
        />
      </CardFooter>
    </Card>
  )
}


