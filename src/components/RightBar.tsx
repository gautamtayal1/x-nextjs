import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"


export function RightBar() {
  return (
    <div className="max-w-[20%]">
      <Sidebar side="right" className="flex-[1]">
        <SidebarContent>
          <div className="p-4">
            <h1 className="font-bold">
              People to Follow
            </h1>
            <div className="mt-3 flex flex-col gap-2">
            <div className="border-2 w-[97%] h-10 rounded-2xl"></div>
            <div className="border-2 w-[97%] h-10 rounded-2xl"></div>
            <div className="border-2 w-[97%] h-10 rounded-2xl"></div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
    
  )
}
