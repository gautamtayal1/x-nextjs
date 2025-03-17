import { ModeToggle } from "@/components/toogle";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return(
    <div>
      <div className="left"></div>
      <div className="right">
        <ModeToggle />
        <SignInButton />
      </div>
    </div>
  )
}
