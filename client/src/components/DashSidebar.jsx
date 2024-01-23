import { Sidebar } from "flowbite-react"
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export const DashSidebar = () => {
  const dispatch=useDispatch();
  const handlesignOut = async()=>{
    try{
      const res = await fetch(`/api/user/signout`, {
        method: 'POST',
      });
      const data= await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signoutSuccess());
      }
    }catch(error){

    }

  }

    const location = useLocation();
  const [tab, setTab]=useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    console.log(tabFromUrl);
    // if tab from url is present then set the tab as it
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab=== 'profile'} icon={HiUser} label={'user'} labelColor='dark' as ='div'>Profile</Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handlesignOut} >Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
