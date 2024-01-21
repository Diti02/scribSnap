import { useSelector } from "react-redux"
import { Button, TextInput } from "flowbite-react"

export const DashProfile = () => {
    const {currentUser}=useSelector(state=>state.user)
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
        <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img src={currentUser.profilePicture} alt="user" className="rounded-full w-full h-fullobject-cover  border-8 border-[lightgray]"/>
            </div>
            <TextInput type='text' id='username' placeholder="username" defaultValue={currentUser.username} className="font-semibold" ></TextInput>
            <TextInput type='email' id='email' placeholder="email" defaultValue={currentUser.email} className="font-semibold"></TextInput>
            <TextInput type='password' id='email' placeholder="password" className="font-semibold" ></TextInput>
            <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
        </form>
        <div className="text-red-500 flex justify-between">
        <span className="cursor-pointer font-semibold">Delete Account</span>
        <span className="cursor-pointer font-semibold">Sign Out</span>
           
        </div>
    </div>
  )
}
