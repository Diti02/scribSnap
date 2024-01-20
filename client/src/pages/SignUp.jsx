import React from 'react'
import { Link } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'

export const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
        {/* left side */}
        {/* //flex-1 adds equal space */}
        <div className="flex-1">
          <Link to="/" className=' dark:text-white text-4xl font-bold '>
            <span className='px-2 py-1 bg-sky-600  rounded-lg text-white'>Scrib</span>
            Snap
          </Link>
          <br></br>
          <p className='text-sm  mt-5 mx-auto'>
            This a project. You can sign up with your email ans password or with Google.
          </p>
        </div>
        
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div >
              <Label value='Your Username'/>
              <TextInput type='text' placeholder='Username' id='username'></TextInput>
            </div>
            <div >
              <Label value='Your Email'/>
              <TextInput type='email' placeholder='name@company.com' id='email'></TextInput>
            </div>
            <div >
              <Label value='Your Password'/>
              <TextInput type='text' placeholder='Password' id='password'></TextInput>
            </div>
            {/* in flow byte we need to mention the type of the button */}
            <Button gradientDuoTone='purpleToBlue' type='submit'>Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
            <span>
              Have an Account?
              </span>
              <Link to='/sign-in' className='text-blue-800 font-semibold italic '>Sign In</Link>
            
          </div>
        </div>
       
      </div>
    </div>
  )
}
