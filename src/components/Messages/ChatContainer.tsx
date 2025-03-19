import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'
import { MessageInput } from './MessageInput'
import MessageList from './MessageList'
import MessageItem from './MessageItem'
const ChatContainer = async({id}: {id: string}) => {
  
  const user = await prisma.user.findUnique({where: {id}})
  return (
    <div className='w-[60vw] bg-[#171717]'>
      <div className="flex items-center gap-3 p-5 border-b border-gray-800">
        <Image src={user?.profilePhoto ?? ''}
        width={25}
        height={25}
        alt="profilePhoto"
        className="rounded"
        />
        <h1 className="text-2xl font-bold">{user?.name}</h1>
      </div>
      <div className='p-5'>
        <MessageItem/>
      </div>


      <div className=''>
        <div className="fixed bottom-0 w-[55vw] p-4 bg-[#171717] border-t border-gray-800">
          <MessageInput/>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer