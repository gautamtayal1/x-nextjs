
import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import Image from "next/image"

import React from 'react'
import { Button } from "./ui/button"
import { ImageIcon } from "lucide-react"

const MainCreatePost = () => {

  return (
    <div>
      <Card className="w-[92%] mx-auto py-5 pl-5">
      <Image src="/logo.jpg" 
            width={30} 
            height={30} 
            alt="image" 
            className="rounded-3xl"/>
          <div className="flex gap-3">
            <textarea
            placeholder="what's happening?"
            className="w-[97%] p-2 border rounded-md resize-none "/>
          </div>
      
        <CardFooter className="flex justify-between">
          <button>
          <ImageIcon />
          </button>
          <Button>Post</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MainCreatePost

