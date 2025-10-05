import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const[sidebar, setSidebar]= useState(false)
  const {user} = useUser();

  if (!user) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <SignIn/>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-start justify-start h-screen bg-slate-900 text-white'>
        <nav className='w-full px-8 min-h-14 flex items-center justify-between bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/80 z-10'>
          <img src={assets.logo} alt="logo" onClick={() => navigate('/')}  className="w-32 sm:w-44 cursor-pointer drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"/>
          {
            sidebar 
              ? <X onClick={()=> setSidebar(false)} className='w-6 h-6 text-slate-300 sm:hidden' />
              : <Menu onClick={()=> setSidebar(true)} className='w-6 h-6 text-slate-300 sm:hidden' />
          }
        </nav>
        <div className='flex-1 w-full flex h-[calc(100vh-64px)] '>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
             <div className='flex-1 bg-slate-900 relative'>
              <div className="absolute inset-0 bg-grid-slate-700/[0.2] bg-cover"></div>
              <div className="relative h-full">
                <Outlet />
              </div>
            </div>
        </div>
     </div>
  );
}

export default Layout
