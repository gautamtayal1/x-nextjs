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
import Link from "next/link"

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
  const [like, setLike] = useState(likes || 0)
  const [likeClicked, setLikeClicked] = useState(false)

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
  const handleLike = async(cardId) => {
    const prevLikes = like
    const newLikeClicked = !likeClicked
    setLikeClicked(newLikeClicked)
    try {
      if(newLikeClicked){
        setLike(like+1)
        await axios.put("/api/post/like", {
          cardId, action: "like"})
      } else {
        setLike(like-1)
        await axios.put("/api/post/like", {
          cardId, action: "dislike"})
      }
    } catch (error) {
      console.log(error)
      setLike(prevLikes)
      setLikeClicked(prevLikeClicked)
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
      <Link href={`/post/${cardId}`}>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      </Link>
      <CardFooter className="flex gap-3">
        <div className="flex gap-1 justify-center items-center">
          <Heart 
          size={20}
          fill="red"
          onClick={() => handleLike(cardId)}/>
          <p>{like || 0}</p>
        </div>
        <Link href={`/post/${cardId}`}>
          <MessageCircle size={20}/>
        </Link>
        
      </CardFooter>
    </Card>
  )
}