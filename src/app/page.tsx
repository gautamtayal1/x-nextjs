import Navbar from "@/components/Navbar";
import { RightBar } from "@/components/ui/RightBar";


export default function Home() {
  return(
    <div>
      <Navbar />
      <div className="feed w-[50vw]"></div>
      <RightBar />
    </div>
  )
}
