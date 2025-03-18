"use client"

import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function RightBar() {

  const [users, setUsers] = useState()
  async function getUsers(){
    const users = await axios.get("/api/profile")
    setUsers(users.data)
    
  }
  useEffect(() => {
    getUsers()
  })

  return (
    <div className="max-w-[20%]">
      <Sidebar side="right" className="flex-[1]">
        <SidebarContent>
          <div className="p-4">
            <h1 className="font-bold">
              People to Follow
            </h1>
            <div className="mt-3 flex flex-col gap-2">
              {users &&
                users.map((user) => (
                  <div 
                  className="border-2 w-[97%] h-15 rounded-2xl flex justify-between items-center p-3 gap-3"
                  key={user.id}>
                    <div>
                    {user.name}
                    </div>
                    <Button>
                      Follow
                    </Button>
                  </div>
                  
                ))
              }
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
    
  )
}
