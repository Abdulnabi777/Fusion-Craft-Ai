import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Community = () => {
  const [creations, setCreations] = useState([])
  const {user}= useUser();
  const fetchCreations = async() => {
    setCreations(dummyPublishedCreationData)
  }
  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user])

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6 text-slate-200'>
      <h1 className='text-2xl font-semibold'>Community Showcase</h1>
      <div className='h-full w-full rounded-xl overflow-y-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'>
        {
          creations.map((creation, index) => (
            <div key={index} className='relative group break-inside-avoid'>  
              <img src={creation.content} alt={creation.prompt} className='w-full h-full object-cover rounded-lg'/>
              <div className='absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white rounded-lg'>
                <p className='text-sm font-medium leading-snug'>{creation.prompt}</p>
                <div className='flex gap-1 items-center '>
                  <p>{creation.likes.length}</p>
                  <Heart className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110 ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}/>
                 </div>
              </div>
            </div>
          ))}
       </div>
   </div>
  )
}

export default Community
