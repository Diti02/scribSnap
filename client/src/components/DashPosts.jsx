import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

export const DashPosts = () => {
  const {currentUser}= useSelector((state)=>state.user)
  const [userPosts, setuserPosts]= useState([])
  const [showMore, setShowMore]=useState(true);
  useEffect(()=>{
    const fetchPosts = async() =>{
      try{
        const res= await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data= await res.json();
        if(res.ok){
          setuserPosts(data.posts);
          if(data.posts.length<9){
            setShowMore(false);
          }
        }
      }catch(error){
        console.log(error.message);
      }
    }

    
    //if current user is admin call the fetchposts
    if(currentUser.idAdmin){
      fetchPosts();
    }
  }, [currentUser._id])

  const handleShowMore = async ()=>{
    const startIndex = userPosts.length;
    console.log(startIndex);
    try{
      console.log("trying");
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data=await res.json();
      if(res.ok){
        console.log("fetching more");
        console.log(data);
        setuserPosts((prev) => [...prev, ...data.posts]);
        console.log(data.posts);
        if(data.posts.length<=9){
          setShowMore(false);
        }
      }
    }catch(error){
        console.log(error);
    }
  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scroll-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scroll-thumb-slate-500">
    {/* if current user is admin and no of posts is >0 show else show no posts */}
    {currentUser.idAdmin && userPosts.length > 0?
    <> 
    
      <Table hoverable classname='shadow-md'>
      <Table.Head>
        <Table.HeadCell>Date Updated</Table.HeadCell>
        <Table.HeadCell>Post image</Table.HeadCell>
        <Table.HeadCell>Post title</Table.HeadCell>
        <Table.HeadCell>Category</Table.HeadCell>
        <Table.HeadCell>Delete</Table.HeadCell>
        <Table.HeadCell><span>Edit</span></Table.HeadCell>

      </Table.Head>
      {userPosts.map((post)=>(
        <Table.Body className="divide-y">
          <Table.Row className="bg-white">
            {/* make the date readable usingtolocale string */}
            <Table.Cell>{new Date(post.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell>
              <Link to={`/post/${post.slug}`}>
                <img src={post.image} alt={post.title} className="w-20 h-10 obect-cover bg-gray-500"/>
              </Link>
            </Table.Cell>

            <Table.Cell>
              <Link className='font-medium text-gray-900' to={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </Table.Cell>

            <Table.Cell>
              <Link className='font-medium text-gray-900' to={`/post/${post.slug}`}>
                {post.category}
              </Link>
            </Table.Cell>

            <Table.Cell>
              <span className='font-medium text-red-500 hover:underline cursor-pointer' >
                Delete
              </span>
            </Table.Cell>

            <Table.Cell>
              <Link className='font-medium text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                Edit
              </Link>
            </Table.Cell>

          </Table.Row>
        </Table.Body>
      ))}
      
      </Table>
      {
        showMore && 
          (<button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7 " >
          Show More
          </button>)
          
      }
      </>
    :(
      <p>You have no posts yet</p>
      
    )}
    </div>
  )
}
