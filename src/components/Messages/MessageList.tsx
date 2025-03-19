import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'

const MessageList = async() => {

  const {id} = await currentUser()
  const users = await prisma.user.findMany({})

  return (
    <div className='w-[25vw] p-5'>
      <h1 className='flex justify-start items-center text-2xl font-bold p-3'>Messages</h1>
      {users.map((user) => (
        <Link href={`/messages/${user.id}`} key={user.id}>
      <Card className='mt-5' >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Image src={user.profilePhoto}
          width={25} 
          height={25}
          alt="profilePhoto"
          className="rounded"/>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription >{user.username}</CardDescription>
        </div>
      </CardHeader>
      </Card>
      </Link>
    ))}
    </div>
    
  )
}

export default MessageList