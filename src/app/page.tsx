import MainCreatePost from "@/components/MainCreatePost";
import Navbar from "@/components/Navbar";
import { PostCard } from "@/components/PostCard";
import { RightBar } from "@/components/RightBar";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  
  const posts = await prisma.post.findMany({
    include: {
      user: true
    }
  })
  return(
    <div className="container flex">
      <Navbar />
      <div className="my-5 w-[90%] m-8 flex flex-col gap-5">
      <MainCreatePost />
      {posts.map((post) => (
        <div key={post.id}>
        <PostCard id={post.id}
        content={post.content}
        likes={post.likes}
        createdAt={post.createdAt}
        userId={post.userId}
        name={post.user.name}
        username={post.user.username}
        profilePhoto={post.user. profilePhoto}
        />
        </div>
      ))}
      </div>
      <RightBar />
    </div>
  )
}
