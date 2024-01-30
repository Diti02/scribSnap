import { CallToAction } from "../components/CallToAction"

export const Projects = () => {
  return (
    <div className=' max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl text-gray-800 font-semibold'>Learn More</h1>
      <p className='text-md text-gray-500 '>Build fun and engaging projects while learning MERN Stack!</p>
      <CallToAction />
      <br></br>
      <br></br>
    </div>
  )
}
