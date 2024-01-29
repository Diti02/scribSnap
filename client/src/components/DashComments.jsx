import { Modal,Table,Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { FaCheck,FaTimes } from "react-icons/fa";

export const DashComments = () => {
  const {currentUser}= useSelector((state)=>state.user)
  const [comments, setComments]= useState([])
  const [showMore, setShowMore]=useState(true);
  const [showModal, setShowModal]=useState(false);
  const[commentIdToDelete, setCommentIdToDelete]=useState('');
  useEffect(()=>{
    const fetchComments = async() =>{
      try{
        const res= await fetch(`/api/comment/getcomments`)
        const data= await res.json();
        if(res.ok){
            setComments(data.comments);
          if(data.comments.length<9){
            setShowMore(false);
          }
        }
      }catch(error){
        console.log(error.message);
      }
    }

    
    //if current user is admin call the fetchusers
    if(currentUser.idAdmin){
        fetchComments();
    }
    //Note changed from currentUser._id
  }, [currentUser._id])

  const handleShowMore = async ()=>{
    const startIndex = comments.length;
    console.log(startIndex);
    try{
      console.log("trying");
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data=await res.json();
      if(res.ok){
        console.log("fetching more");
        console.log(data);
        setComments((prev) => [...prev, ...data.comments]);
        console.log(data.comments);
        if(data.comments.length<=9){
          setShowMore(false);
        }
      }
    }catch(error){
        console.log(error);
    }
  }

  const handleDeleteComment = async ()=>{
    setShowModal(false);
    try{
      const res= await fetch(
      `/api/comment/deleteComment/${commentIdToDelete}/`,
      {
        method: 'DELETE',

      }
      );
      const data= await res.json;
      if(!res.ok){
        console.log(data.message);
      } else{
        setComments((prev)=>
          prev.filter((comment)=>comment._id!== commentIdToDelete)
        );
      }

    }catch(error){
      console.log(error.message);
    }

  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scroll-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scroll-thumb-slate-500">
    {/* if current user is admin and no of posts is >0 show else show no posts */}
    {currentUser.idAdmin && comments.length > 0?(
    <>
    
      <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell>Date Updated</Table.HeadCell>
        <Table.HeadCell>Comment Content</Table.HeadCell>
        <Table.HeadCell>Number of Likes</Table.HeadCell>
        <Table.HeadCell>PostId</Table.HeadCell>
        <Table.HeadCell>UserId</Table.HeadCell>
        <Table.HeadCell>Delete</Table.HeadCell>
        {/* <Table.HeadCell><span>Edit</span></Table.HeadCell> */}

      </Table.Head>
      {comments.map((comment)=>(
        
        <Table.Body className="divide-y" key={comment._id}>
          <Table.Row className="bg-white">
            {/* make the date readable usingtolocale string */}
            <Table.Cell>{new Date(comment.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell>
              
                {comment.content}
             
            </Table.Cell>

            <Table.Cell>
              
                {comment.numberOfLikes}
             
            </Table.Cell>

            <Table.Cell>
              
            {comment.postId}
              
            </Table.Cell>

            
            <Table.Cell>
              <span onClick={()=>{
                setShowModal(true);
                setCommentIdToDelete(comment._id);
              }} className='font-medium text-red-500 hover:underline cursor-pointer' >
                Delete
              </span>
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
    ):(
      <p>You have no comments yet</p>
      
    )}
    <Modal 
      show={showModal} 
      onClose={()=>setShowModal(false)} 
      popup 
      size='md'>

      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'></HiOutlineExclamationCircle>
          <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment</h3>
          <div className="flex justify-center gap-4">
            <Button color='failure' onClick={handleDeleteComment}>Yes I'm sure</Button>
            <Button color= 'gray' 
            >No, cancel</Button>
          </div>
        </div>
      </Modal.Body>

      </Modal>
    </div>
  )
}
