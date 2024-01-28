import { Button } from "flowbite-react"

export const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-blue-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
    <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl" >Want to learn more about MERN Stack</h2>
        <p className="text-gray-500 my-2">Choose these resources and learn them</p>
        <Button gradientDuoTone='purpleToBlue' className="rounded-tl-2xl rounded-br-2xl">
        <a href="www.google.com" target='_blank' rel='noopener noreferrer'>
        Explore</a></Button>
    </div>
    <div className="flex-1 p-7">
        <img src='https://miro.medium.com/v2/resize:fit:1358/1*k0SazfSJ-tPSBbt2WDYIyw.png'></img>
    </div>
    </div>
  )
}
