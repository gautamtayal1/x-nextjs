"use client"

import Navbar from '@/components/Navbar'
import { RightBar } from '@/components/RightBar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

const PostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [input, setInput] = useState('')
  const [comments, setComments] = useState([])
  const [like, setLike] = useState({})
  const [likeClicked, setLikeClicked] = useState(false)

  const getPost = async () => {
    try {
      const res = await axios.get(`/api/post/${id}`)
      setPost(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPost()
    
  }, [id])

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/post/${id}/comment`, {
        content: input
      })
      
    } catch (error) {
      console.error(error)
    }
    getComments()
  }

  const getComments = async() => {
    try {
      const res = await axios.get(`/api/post/${id}/comment`)
      console.log(res.data)
      setComments(res.data)
      const initialLikes = res.data.reduce((acc, comment) => {
        acc[comment.id] = comment.likes
        return acc
      }, {})
      setLike(initialLikes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  const handleLike = async(commentId) => {
    const prevLikes = {...like}
    const likeUpdated = !likeClicked[commentId]
    setLikeClicked((prev) => ({ ...prev, [commentId]: !prev[commentId] }));

    try {
      const updatedLikes = {...like}
      if(likeUpdated){
        updatedLikes[commentId] += 1
        await axios.put(`/api/post/${id}/comment/commentLike`, {
          commentId,
          action: "like"
        })
      } else {
        updatedLikes[commentId] -= 1
        await axios.put(`/api/post/${id}/comment/commentLike`, {
          commentId,
          action: "dislike"
        })
      }
      setLike(updatedLikes)
    } catch (error) {
      console.log(error)
      setLike(prevLikes)
      setLikeClicked(!likeUpdated)
    }
  }

  return (
    <div className='flex'>
      <Navbar />
      <div className='my-5 w-[50vw] flex flex-col gap-5'>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Image 
                src={post?.user.profilePhoto || "/logo1.png"}
                width={25}
                height={25}
                alt="profilePhoto"
                className="rounded"
              />
              <CardTitle>{post?.user.name}</CardTitle>
              <CardDescription>@{post?.user.username}</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <p>{post?.content}</p>
          </CardContent>
          <CardFooter>
            <form>
              <div className="flex gap-3">
                <textarea
                  name="content"
                  placeholder="too judgemental ahh?"
                  value={input}
                  className="w-[45vw] p-2 border rounded-md resize-none mb-3"
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <CardFooter className="flex justify-end">
                <Button 
                onClick={handleSubmit}>Post</Button>
              </CardFooter>
            </form>
          </CardFooter>
        </Card>

        {/* comment card */}

        {comments?.length > 0 ? 
        comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Image 
                src={comment?.post?.user?.profilePhoto}
                width={25}
                height={25}
                alt="profilePhoto"
                className="rounded"
              />
              <CardTitle>{comment?.post?.user?.name}</CardTitle>
              <CardDescription>@{comment?.post?.user?.username}</CardDescription>
              <p></p>
            </div>
          </CardHeader>

          <CardContent>
            <p>{comment?.content}</p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-1 justify-center items-center">
              <Heart 
              size={20}
              fill="red"
              onClick={() => handleLike(comment.id)}/>
              <p>{like[comment.id]}</p>
            </div>
          </CardFooter>
        </Card>
        ))
        :
        <div className='text-center text-gray-500'>
          No comments yet!</div>}
      </div>
      <RightBar />
    </div>
  )
}

export default PostPage