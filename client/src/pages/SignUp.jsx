import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { OAuth } from '../components/OAuth.jsx'
export const SignUp = () => {
  
  // VVVI :Extract data from form
  const [formData, setFormData] = useState({});
  const [errorMessage, seterrorMessage] = useState(null);
  const [loading, setloading] = useState(false);
const navigate=useNavigate();
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value.trim()});//trim to remove extra white spaces
    // console.log(e.target.value);
  }
  // console.log(formData);

  const handleSubmit = async(e)=>{
    //prevent default behaviour on submit i.e page refreshes
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return seterrorMessage('Please fill out all the fields');
    }
    try{
      setloading(true);
      seterrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data= await res.json();
      if(data.success===false){
        seterrorMessage(data.message);
      }
      //after successful sign up, set loading is false
      //then navigate to sign-in page
      setloading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    }
    catch(error){
      console.log(error);
      seterrorMessage(error.message);
    }
  }

  


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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div >
              <Label value='Your Username'/>
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}></TextInput>
            </div>
            <div >
              <Label value='Your Email'/>
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}></TextInput>
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}></TextInput>
            </div>
            {/* in flow byte we need to mention the type of the button */}
            {/* disabled isables multiple time clicking sign up, if one sign up query is in queue */}
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
            
            {
              loading?(<>
                <Spinner size='sm'/>
                <span>Loading...</span>
              </>
               
              ):"Sign Up"
            }
            </Button>
            <OAuth></OAuth>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
            <span>
              Have an Account?
              </span>
              <Link to='/sign-in' className='text-blue-800 font-semibold italic '>Sign In</Link>
            
          </div>
          {/* after submission if error message exists */}
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
            }          
        </div>
       
      </div>
    </div>
  )
}
