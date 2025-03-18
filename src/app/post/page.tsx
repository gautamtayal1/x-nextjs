import MainCreatePost from '@/components/MainCreatePost'
import Navbar from '@/components/Navbar'
import { RightBar } from '@/components/RightBar'
import React from 'react'

const CreatePostPage = async() => {
  return (
    <div className='flex gap-2 my-3'> 
      <Navbar />
      <MainCreatePost />
      <RightBar />
    </div>
  )
}

export default CreatePostPage