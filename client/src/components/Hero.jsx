import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-slate-900 min-h-screen'>
      <div className="absolute inset-0 bg-grid-slate-700/[0.2] bg-cover"></div>
      <div className="absolute inset-0 bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat opacity-20"></div>

      <div className='text-center mb-6 cursor-pointer'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
          Create amazing content <br /> with <span className='text-purple-600'>AI tools </span>
        </h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
          Transform your content creation with our suite of premium AI tools  
          Write articles, generate images, and enhance your workflow with ease..
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <div className='relative group'>
          <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
          <button 
            onClick={() => navigate('/ai')} 
            className='relative bg-slate-900 text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition-transform cursor-pointer'
          >
            Start Creating Now
          </button>
        </div>
        
        <button className='bg-white text-slate-800 px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition-transform cursor-pointer'>
          Watch demo
        </button>
      </div>

      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600 cursor-pointer'>
        <img src={assets.user_group} alt="" className='h-8' />
        Trusted by santhya mam and other 10K+ people
      </div>
    </div>
  )
}

export default Hero
