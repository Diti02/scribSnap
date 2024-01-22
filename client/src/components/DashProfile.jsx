import { useSelector } from "react-redux"
import { Alert, Button, TextInput } from "flowbite-react"
import { useState, useRef, useEffect } from "react";
import { updateStart, 
        updateSuccess,
        updateFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {getDownloadURL, 
        getStorage,
        ref, 
        uploadBytesResumable} from "firebase/storage";
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setimageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setformData]=useState({});
    console.log(imageFileUploadProgress,imageFileUploadError);
    const filePickerRef = useRef();
    const dispatch =useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        //if file exists create a temporary url 
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    //if there ia an image file then upload it
    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);

    const uploadImage = async()=>{
    // console.log("Uploading.......");
    setImageFileUploading(true);
    setimageFileUploadError(null);
    const storage = getStorage(app);
    const fileName= new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
        'state_changed',
        (snapshot)=>{
            const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            // console.log(`Upload is ${progress}% done`)
            setimageFileUploadProgress(progress.toFixed(0));
        },
        (error)=>{
            setimageFileUploadError("File must be less than 2MB");
            setimageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageFileUrl(downloadURL);
                setformData({...formData, profilePicture: downloadURL})
                setImageFileUploading(false);
            });
        }
    );
    };

    const handleChange= (e)=>{
      setformData({...formData, [e.target.id]: e.target.value});
      
    };
    console.log(formData);

    const handleSubmit  = async (e) =>{
      //prevent default behaviour of submit button(refreshes the page)
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      //if formdata is empty return
      if(Object.keys(formData).length===0){
        setUpdateUserError('No changes made');
        return;
      }
      if (imageFileUploading) {
        setUpdateUserError('Please wait for image to upload');
        return;
      }
      try{
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data= await res.json();
        if(!res.ok){
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        }
        else{
          dispatch(updateSuccess(data));
          
          setUpdateUserSuccess("User's profile updated successfully");
        }
      }catch(error){
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }

    }


    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
                <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>

                {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
                    




                    {/* if imageFileUrl exists,  a new image is set set it as profile pic else set default profile picture */}
                    <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
                {/* if imageFileUploadError has some value so error exists then show error */}
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
                <TextInput type='text' id='username' placeholder="username" defaultValue={currentUser.username} className="font-semibold" onChange={handleChange}></TextInput>
                <TextInput type='email' id='email' placeholder="email" defaultValue={currentUser.email} className="font-semibold"onChange={handleChange}></TextInput>
                <TextInput type='password' id='password' placeholder="password" className="font-semibold" onChange={handleChange}></TextInput>
                <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer font-semibold">Delete Account</span>
                <span className="cursor-pointer font-semibold">Sign Out</span>

            </div>
            {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
        </div>
    )
}
