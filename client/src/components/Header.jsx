import { Avatar, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai';
import { Button } from 'flowbite-react';
import {FaMoon} from 'react-icons/fa';
import { useSelector } from 'react-redux'; 
import { signoutSuccess      
  } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';



export const Header = () => {
    const path=useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    //get whetehr current user exits or not from state
    const {currentUser} = useSelector(state=>state.user);

    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm);
    //each time url is changed we get the url and set it in searchTermURL
    useEffect (()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search]);
    const dispatch= useDispatch();
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


    const handleSubmit = (e) => {
        e.preventDefault();
        //on submitting set the new url

        //fetch current url
        const urlParams = new URLSearchParams(location.search);

        //set new url
        urlParams.set('searchTerm', searchTerm);

        //convert it to string & navigate
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
  
  return (
    <Navbar className='border-b-2'>
    <Link to="/" className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-sky-600 text-lg rounded-lg text-white'>Scrib</span>
        Snap
    </Link>
    <form onSubmit={handleSubmit} onClick={handleSubmit}>
        <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}>

        </TextInput>
    </form>
    <div className='flex gap-2 md:order-2'>
    <Button className='w-12 h-10 lg:hidden' color='grey' pill>
        <AiOutlineSearch></AiOutlineSearch>
    </Button>
    {/* light/dark mode toggle button */}
    {/* <Button className='w-12 h-10 hidden sm:inline' color='grey' pill>
        <FaMoon></FaMoon>
    </Button> */}

    {/* create a dynamic sign in button, if current user exists
    show their avatar and dropdown
    else show sign in */}
    {currentUser ? (
        <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar
        alt='user'
        img={currentUser.profilePicture}
        rounded
        ></Avatar>}
        >

        <Dropdown.Header>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span className='block text-medium truncate'>{currentUser.email}</span>
        </Dropdown.Header>
        <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        <Dropdown.Divider></Dropdown.Divider>
    <Dropdown.Item onClick={handlesignOut}>Sign out</Dropdown.Item>
        </Dropdown>
    ):
    (
    <Link to='/sign-in'>
    <Button gradientDuoTone='purpleToBlue' outline>
        Sign In 
    </Button>
    </Link>
    
    )
    
    }

<Navbar.Toggle></Navbar.Toggle>

</div>
    <Navbar.Collapse>
    <Navbar.Link active={path==="/"} as={'div'}>
        <Link to='/'>
            Home
        </Link>
    </Navbar.Link>

    <Navbar.Link active={path==="/about"} as={'div'}>
        <Link to='/about'>
            About
        </Link>
    </Navbar.Link>

    <Navbar.Link active={path==="/projects"} as={'div'}>
        <Link to='/projects'>
            Projects
        </Link>
    </Navbar.Link>
</Navbar.Collapse>

    </Navbar>

  )
}
