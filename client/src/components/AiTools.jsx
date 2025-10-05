import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';

const AiTools = () => {
    const navigate = useNavigate()
    const {user} = useUser()
  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24 relative'>
        <div className='text-center'>
            <h2 className='text-slate-100 text-[42px] font-semibold'>Powerful Ai Tools</h2>
            <p className='text-slate-400 max-w-lg mx-auto'>Everything you need to create, enchance, and optimize your content with cutting-edge AI technology.</p>
        </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
         {AiToolsData.map((tool, index)=>(
            <div key={index} 
                 className='relative group rounded-xl border border-slate-700 bg-slate-800/50 hover:-translate-y-2 transition-transform duration-300'
                 style={{'--glow-color-from': tool.bg.from, '--glow-color-to': tool.bg.to}}>
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-[var(--glow-color-from)] to-[var(--glow-color-to)] blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className='relative p-8 cursor-pointer' onClick={()=> user && navigate(tool.path)}>
                    <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl' style={{background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}} />
                    <h3 className='mt-6 mb-3 text-lg font-semibold text-slate-200'>{tool.title}</h3>
                    <p className='text-slate-400 text-sm max-w-[95%]'>{tool.description}</p>
                </div>
             </div>
         ))}
      </div>
    </div>
  )
}

export default AiTools
