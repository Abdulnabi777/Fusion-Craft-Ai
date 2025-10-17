import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([])
  const {user}= useUser();
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth()
  
  const fetchCreations = async() => {
    try {
      const{data} = await axios.get('/api/user/get-published-creations',
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`}
          }
        )
      if(data.success){
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error){
        toast.error(error.message)

    }
      setLoading(false)
   }

   const imageLikeToggle = async (id) => {
    const originalCreations = creations;
    const updatedCreations = creations.map(creation => {
      if (creation.id === id) {
        const isLiked = creation.likes.includes(user.id);
        if (isLiked) {
          return { ...creation, likes: creation.likes.filter(likeId => likeId !== user.id) };
        } else {
          return { ...creation, likes: [...creation.likes, user.id] };
        }
      }
      return creation;
    });
    setCreations(updatedCreations);

    try {
      const { data } = await axios.post('/api/user/toggle-like-creation', { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setCreations(originalCreations);
      }
    } catch (error) {
      toast.error(error.message);
      setCreations(originalCreations);
    }
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
          creations.map((creation) => (
            <div key={creation.id} className='relative group break-inside-avoid'>  
              <img src={creation.content} alt={creation.prompt} className='w-full h-full object-cover rounded-lg'/>
              <div className='absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white rounded-lg'>
                <p className='text-sm font-medium leading-snug'>{creation.prompt}</p>
                <div className='flex gap-1 items-center '>
                  <p>{creation.likes.length}</p>
                  <Heart onClick={()=> imageLikeToggle(creation.id)} className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110 ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}/>
                 </div>
              </div>
            </div>
          ))}
       </div>
   </div>
  )
}

export default Community
