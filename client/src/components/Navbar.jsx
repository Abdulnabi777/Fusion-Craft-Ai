import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate()
    const {user}= useUser()
    const {openSignIn} = useClerk()
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-slate-900/30 backdrop-blur-lg flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <img src={assets.logo} alt="logo" className="w-32 sm:w-44 cursor-pointer drop-shadow-[0_0_10px_rgba(147,51,234,0.8)]" onClick={() => navigate('/')} />

{
  user ? <UserButton /> : (
       
<button onClick={openSignIn} className="flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-purple-600 hover:bg-purple-700 transition-colors text-white px-10 py-2.5 shadow-[0_0_15px_rgba(147,51,234,0.6)]">
  Get Started <ArrowRight className="w-4 h-4" />
</button>
 )
}
    </div>
  )
}

export default Navbar
