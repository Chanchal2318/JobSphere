import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Unlock Your Future with JobSphere!</span>
        <h1 className='text-5xl font-bold'>Search,Apply &<br></br><span className='my-4 text-[#6A38C2]'>Get Your Dream Job</span></h1>
        <p className='center-text'>Discover a world of opportunities tailored just for you.<br></br> Whether you’re a seasoned professional or just starting your career journey, we connect you with the right employers.<br></br> Explore, apply, and take the next step towards your dream job today!</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type="text" placeholder="Find your dream job" className='outline-none border-none w-full'></input>
            <Button className="rounded-r-full bg-[#6A38C2]"><Search className="h-5 w-5"/></Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection
