import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getStorage, uploadBytesResumable,ref,getDownloadURL} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {app} from '../firebase'

const CreatePost = () => {
    
    const [file, setFile]= useState(null);
    const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setimageFileUploadError] = useState(null);
    const [formData,setformData]= useState({});
    const [publishError, setPublishError]= useState(null);
    const navigate=useNavigate();
    console.log(formData);
    const handleUploadImage = async ()=>{
        try{
            if(!file){
                setimageFileUploadError('Please select an image');
                return;
            }
            setimageFileUploadError(null);
            const storage=getStorage(app);
            const fileName= new Date().getTime()+ '-'+ file.name;
            const storageRef= ref(storage, fileName);
            const uploadTask= uploadBytesResumable(storageRef,file);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    //toFixed removed decimal places
                    setimageFileUploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setimageFileUploadError("File must be less than 2MB");
                    setimageFileUploadProgress(null);
                
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setimageFileUploadProgress(null);
                        setimageFileUploadError(null);
                        setformData({...formData, image: downloadURL});
                    });
                }
            );
        }catch(error){
            setimageFileUploadError("Image upload failed");
            setimageFileUploadProgress(null);

        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res= await fetch('/api/post/create',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(!res.ok){
                setPublishError(data.message)
                return 
            }
            
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
            console.log(data);
        }catch(error){
            setPublishError('Something went wrong');
        }
    }
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e)=>
                        setformData({...formData, title: e.target.value})
                        }
                    />
                    <Select
                    onChange={(e)=>
                        setformData({...formData, category: e.target.value})
                        }
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        onClick={handleUploadImage}
                        disabled={imageFileUploadProgress}
                    >
                    {imageFileUploadProgress ?
                    (<div className='w-16 h-16'>
                        <CircularProgressbar
                        value={imageFileUploadProgress}
                        text={`${imageFileUploadProgress || 0}%`}/>
                    </div>)
                    : ('Upload image'
                    )}                        
                    </Button>
                    </div>
                    {/* if error exists in file uploading */}
                    {imageFileUploadError && 
                        <Alert color='failure'>
                            {imageFileUploadError}
                        </Alert>
                    }
                    {/* after image is uploaded it contains from data, then display the image */}
                    {formData.image && (
                        <img
                        src={formData.image}
                        alt='upload'
                        className='w-full h-72 object-cover'/>
                    )}
                
                <ReactQuill
                    theme='snow'
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    required
                    onChange={(value)=>
                        setformData({...formData, content: value})
                        }
                />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>
                {publishError && <Alert color='failure' className='mt-5'>{publishError}</Alert> }
            </form>
        </div>
    )
}

export default CreatePost