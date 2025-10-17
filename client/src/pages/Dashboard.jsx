import React, { useState, useEffect } from 'react'
import { dummyCreationData } from '../assets/assets';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import CreationItems from '../components/CreationItems';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {

  const [creations, setCreations] = useState(dummyCreationData);
  const [loading, setLoading] = useState(true);
  const {getToken} = useAuth()

  const getDashboardData = async () => {
    try {
        const {data} = await axios.get('/api/user/get-user-creations', {
          headers: {Authorization : `Bearer ${await getToken()}`}
        })
      
        if(data.success){
          setCreations(data.creations)
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)

    }
    setLoading(false);
  }
  

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-auto p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* Total Creations Card */}
        <div className='relative group flex justify-between items-center w-72 p-4 px-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:-translate-y-1 transition-transform duration-300'>
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className='relative text-slate-300'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold text-white'>{creations.length}</h2>
          </div>
          <div className='relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>

        {/* Active plan Card */}
        <div className='relative group flex justify-between items-center w-72 p-4 px-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:-translate-y-1 transition-transform duration-300'>
          <div className="absolute -inset-px bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className='relative text-slate-300'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold text-white'>
              <Protect plan='premium' fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className='relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white'/>
           </div>
        </div>

      </div>
      {
        loading ? 
        (
          <div className='flex justify-center items-center h-3/4'>
            <div className='animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent '>
            </div>
          </div>
        ):
        (
          <div className='space-y-3'>
          <p className='mt-6 mb-4'>
            Recent Creations
          </p>
          {
            creations.map((item)=><CreationItems key={item.id} item={item} />)
          }
      </div>
        )
      }
 
     </div>
  )
}

export default Dashboard
