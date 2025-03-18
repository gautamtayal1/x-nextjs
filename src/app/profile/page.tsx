import Navbar from '@/components/Navbar'
import { RightBar } from '@/components/RightBar'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import Image from 'next/image'
import { PostCard } from '@/components/PostCard'

const page = async() => {
  
  const {id} = await currentUser()
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  const followers = await prisma.follow.count({
    where:{toUserId: id}
  })
  const following = await prisma.follow.count({
    where:{fromUserId: id}
  })
  const posts = await prisma.post.findMany({
    where:{
      userId:id
    },
    include: {
      user: true
    }
  })

  return (
    <div className='flex'>
      <Navbar />
        <div className='w-[50vw]'>
        <div className="relative">
          {/* Cover Photo */}
          <div className="w-full h-[200px] bg-gray-200 relative">
            {user?.coverPhoto ? (
              <Image
                src="/cover-placeholder.jpg"
                alt="Cover Photo"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700" />
            )}
          </div>

          {/* Profile Photo */}
          <div className="absolute -bottom-16 left-4">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
              {user?.profilePhoto ? (
                <Image
                  src={user.profilePhoto}
                  alt="Profile Photo"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-400" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-20 mb-4">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-gray-600">@{user?.username}</p>

          <div className="flex gap-4 mt-4">
            <span><strong>{following}</strong> Following</span>
            <span><strong>{followers}</strong> Followers</span>
          </div>
        </div>

        {/* Posts feed */}
        <div className="space-y-4">
          
          <h1 className='text-2xl font-bold mb-4'>Posts</h1>
          <div className='flex flex-col gap-7'>
            {
              posts.length === 0 ? 
              <div>No posts yet</div> :
              posts.map((post) => (
                <div key={post.id}>
                <PostCard id={post.id}
                content={post.content}
                likes={post.likes}
                createdAt={post.createdAt}
                userId={post.userId}
                name={post.user.name}
                username={post.user.username}
                profilePhoto={post.user. profilePhoto}
                />
                </div>
              ))
            }
          </div>
        </div>
        </div>
      <RightBar />
    </div>
  )
}

export default page