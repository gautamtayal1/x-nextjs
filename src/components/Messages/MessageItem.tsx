import React from 'react'

const MessageItem = () => {
  return (
    <div className='flex flex-col gap-1'>
      <div className="chat-name">John Doe</div>
      <div className="chat-container border-2 border-gray-300 rounded-md p-2 h-auto w-[50%]">
        <div className="chat-box">
          <div className="chat-message">
            Hello, this is a message!
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem