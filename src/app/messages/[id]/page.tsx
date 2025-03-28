import ChatContainer from '@/components/Messages/ChatContainer'
import MessageList from '@/components/Messages/MessageList'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = async({params}: {params: {id: string}}) => {
  const {id} = await params
  return (
    <div className='flex'>
      <Navbar />
      <MessageList />
      <ChatContainer id={id}/>
    </div>
    
  )
}

export default page