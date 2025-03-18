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
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import axios from "axios"

export const PostCard = (
  {cardId, 
  content, 
  likes, 
  createdAt, 
  userId, 
  name, 
  username,
  profilePhoto,
  personalId
 }) => {

  const [followed, setFollowed] = useState(false)
  const [followedUser, setFollowedUser] = useState([])

  const handleFollow = (toUserId) => {
    setFollowed(!followed)
    if(!followed) {
      followReq(toUserId)
    } else {
      unfollowReq(toUserId)
    }
  }
  
  useEffect(() => {
    const fetchFollowed = async() => {
      try {
        const response = await axios.get("http://localhost:3000/api/follow")
        console.log(response.data.data)

        setFollowedUser(response.data.data) 
      } catch (error) {
        console.log(error)}}
    
      fetchFollowed()}, [])

  useEffect(() => {
        const isFollowing = followedUser.find((user) => user.toUserId === userId);
        setFollowed(!!isFollowing);
    }, [followedUser, userId]);

  const followReq = async(toUserId) => {
    try {
      await axios.post("http://localhost:3000/api/follow", {
        toUserId: String(toUserId)
      })
      console.log("Followed")
    } catch (error) {
      console.log(error)
    }
  }
  const unfollowReq = async(toUserId) => {
    try {
      await axios.delete("http://localhost:3000/api/follow", {
        data:{
          toUserId
        }
      })
      console.log("Unfollowed")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Image src={profilePhoto} 
          width={25} 
          height={25}
          alt="profilePhoto"
          className="rounded"/>
          <CardTitle>{name}</CardTitle>
          <CardDescription >@{username}</CardDescription>
          {personalId !== userId && <Button 
          className="ml-[40%]"
          onClick={() => handleFollow(userId)}>
            { userId !== personalId &&
            followed ? "Unfollow" : "Follow"}
          </Button>}
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
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