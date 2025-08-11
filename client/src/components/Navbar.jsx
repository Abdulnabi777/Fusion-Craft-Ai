import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='fixed z-5 w-full background-blur-2xl flex justify-between items-center cursor-pointer py-3 px-4 sm:px-20 xl:px-32'>
<img src={assets.logo} alt="logo" className="w-32 sm:w-44" onClick={() => navigate('/')} />

        
<button className="flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-[var(--color-primary)] hover:bg-[color-mix(in srgb, var(--color-primary) 90%, white)] transition-colors text-white px-10 py-2.5">
  Get Started <ArrowRight className="w-4 h-4" />
</button>
 
    </div>
  )
}

export default Navbar
