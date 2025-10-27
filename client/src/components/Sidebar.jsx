import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, House, Image, LogOut, Mail, Scissors, SquarePen, User } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
  {to: '/ai' , label: 'Dashboard', Icon: House}, 
  {to: '/ai/content-craft' , label: 'ContentCraft', Icon: SquarePen}, 
  {to: '/ai/email-craft' , label: 'EmailCraft', Icon: Mail}, 
  {to: '/ai/generate-images' , label: 'Prompt2Image', Icon: Image}, 
  {to: '/ai/remove-background' , label: 'MagicCut BG', Icon: Eraser}, 
  {to: '/ai/remove-object' , label: 'ObjectRemove AI', Icon: Scissors}, 
  {to: '/ai/docu-analyzer' , label: 'DocAnalyzer', Icon: FileText}, 
  {to: '/ai/community' , label: 'Community', Icon: User}, 
]
  const Sidebar = ({sidebar, setSidebar}) => {
    const {user} = useUser();
    const {signOut, openUserProfile}= useClerk()
  return (
    <div className={`w-60 overflow-y-hidden bg-slate-900 border-r border-slate-700/80 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
      <div className='my-7 w-full '>
        <img src={user.imageUrl} alt="user avatar" className='w-13 rounded-full mx-auto' />
        <h1 className='mt-1 text-center text-slate-200'>{user.fullName}</h1>
        <div className='px-6 mt-5 text-sm text-slate-400 font-medium '>
          {navItems.map(({to , label, Icon})=>(
            <NavLink key={to} to={to} end={to === '/ai'} onClick={()=> 
              setSidebar(false)} className={({isActive})=>`px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                {({isActive})=>
                (
                  <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`}/>
                  {label}
                  </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className='w-full border-t border-slate-700/80 p-4 px-7 flex items-center justify-between '>
          <div onClick={openUserProfile} className='flex gap-2  items-center cursor-pointer'>
            <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
            <div>
              <h1 className='text-sm font-medium text-slate-200'>
                {user.fullName}
              </h1>
              <p className='text-xs text-slate-500'>
                <Protect plan='premium' fallback="Free">
                  Premium 
                </Protect>
                  -Plan
              </p>
            </div>
           </div>
            <LogOut onClick={signOut} className='w-4.5 text-slate-400 hover:text-slate-200 transition cursor-pointer'/>
          
      </div>
    </div>
  )
}

export default Sidebar