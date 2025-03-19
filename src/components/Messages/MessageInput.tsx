"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function MessageInput() {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if(input.trim() !== '') {
      setInput("")
    }
  
  }
  return (
    <div className="grid w-full gap-2">
      <Textarea 
      placeholder="Type your message here." 
      onChange={(e) => setInput(e.target.value)}
      value={input}/>

      <Button 
      type="submit" 
      onClick={handleSubmit}>
        Send message
      </Button>
    </div>
  )
}

