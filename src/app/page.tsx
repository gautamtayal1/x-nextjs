import { ModeToggle } from "@/components/toogle";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return(
    <div>
      <div className="left"></div>
      <div className="right">
        <ModeToggle />
        <SignInButton />
        <UserButton />
      </div>
    </div>
  )
}
