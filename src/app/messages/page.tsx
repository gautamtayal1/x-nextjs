import ChatContainer from '@/components/Messages/ChatContainer'
import MessageList from '@/components/Messages/MessageList'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <Navbar />
      <MessageList />
      <ChatContainer />
    </div>
    
  )
}

export default page