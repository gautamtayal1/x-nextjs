import { Calendar, Home, Inbox, Search} from "lucide-react"
import { ModeToggle } from "@/components/toogle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Calendar,
  },
  // {
  //   title: "Post",
  //   url: "/post",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

export function AppSidebar() {
  return (
    <Sidebar className="max-w-[20%]">
      <div className="flex justify-between items-center pr-3">
        <Image src="/logo2.jpg" width={50}
        height={50}
        alt="Picture of the author" 
        className="rounded ml-3 mt-3"/>
        <ModeToggle />
          
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
            
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignedOut>
          <Button asChild>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <Button className="mx-5 ">
            <UserButton />
          </Button>
          
        </SignedIn>
        
        
      </SidebarFooter>
    </Sidebar>
  )
}
