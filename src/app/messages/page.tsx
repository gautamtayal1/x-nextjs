import ChatContainer from '@/components/Messages/ChatContainer'
import MessageList from '@/components/Messages/MessageList'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <Navbar />
      <MessageList />
      <div className='w-[60vw] bg-[#171717]'>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-2xl">Select a user to start chatting</p>
        </div>
        </div>
    </div>
    
  )
}

export default page