import { Link } from "react-router-dom"
import {CallToAction} from "../components/CallToAction.jsx"
import {PostCard} from "../components/PostCard.jsx"
import { useEffect, useState } from "react"

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect (()=>{
    const fetchPosts = async ()=>{
      const res = await fetch('/api/post/getposts')
        const data = await res.json();
        if(res.ok){
          setPosts(data.posts);
        }
    }
    fetchPosts(); 
  }, []);
  return (
    <div>
    <div className="flex flex-col gap-6 p-28 p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl text-blue-700 font-bold lg:text-6xl">Welcome to Snap Scrib</h1>
      <h2 className=" font-semibold ">Unleashing the Power of Tech Insights</h2>
      <p className="text-gray-500 text-xs">Whether you're a seasoned tech enthusiast or a curious newcomer, our blog is your gateway to a world where cutting-edge ideas meet insightful analysis.</p>
      <Link to='/search' className='text-xs sm:text-sm text-blue-700 font-bold font-style: italic hover:underline'>View All Posts</Link>
    </div>
   
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
      {posts && posts.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
          <div className="flex flex-wrap gap-4">
            {posts.map((post)=>(
              <PostCard key={post._id} post={post}/>
            ))}
          </div>
          <Link to='/search' className='text-lg  text-blue-700 text-center font-bold font-style: italic hover:underline'>View All Posts</Link>
        </div>
      )}
    </div>
    <div className="p-3 bg-sky-50 mx-10 my-5 mx-auto">
      <CallToAction/>
    </div>
    </div>
  )
}
