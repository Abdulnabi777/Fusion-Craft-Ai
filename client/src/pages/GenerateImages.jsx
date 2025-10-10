import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const  imageStyle = [ 'Realistic', 'Ghibli Style', 'Pixel Art', '3D Style', 'Cartoon', 'Anime', 'Isometric', 'Line Art', 'Flat Design', 'Low Poly' ]
  
     const [selectedStyle, setSelectedStyle] = useState('Realistic')
     const [input, setInput] = useState('')
     const [publish, setPublish]= useState(false)
     const [loading, setLoading] = useState(false)
     const [content, setContent] = useState('')
     const {getToken} = useAuth()

     const onSubmitHandler = async(e) => {
      e.preventDefault();
      try {
        setLoading(true)
        const prompt = `Generate an image of ${input} in the style ${selectedStyle}`
        const {data} = await axios.post('/api/ai/generate-image', {prompt,publish},
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`}
          }
        )
      if(data.success){
        setContent(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error){
        toast.error(error.message)

    }
      setLoading(false)
   }
  return (
 <div className='h-full overflow-y-auto p-6 flex justify-center items-start gap-4 text-slate-300'>
      <Toaster />
      {/* Left Coulum*/}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700'>
        <div className='flex items-center gap-3'>
          <Sparkles  className='w-6 text-green-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>AI Image Generator </h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea onChange={(e)=> setInput(e.target.value)} value={input}  rows={4} className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 focus:ring-2 focus:ring-green-500' placeholder='Describe what you want to see in the image' required/>
        <p className='mt-4 text-sm font-medium'>
        Style
        </p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {imageStyle.map((item )=>(
            <span onClick={()=>  setSelectedStyle(item)} key={item} 
            className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-colors ${selectedStyle === item ? 'bg-green-600 text-white border-green-500' : 'text-slate-400 border-slate-600 hover:bg-slate-700'}`}>
              {item}
            </span>
          ))}
        </div>
        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e)=> setPublish(e.target.checked)} checked={publish} className='sr-only peer'/>
            <div className='w-9 h-5 bg-slate-700 rounded-full peer-checked:bg-green-600 transition'></div>
              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm font-medium'>Make this image Public</p>
        </div>
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity'>
                  {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>:<Image className='w-5'/>

          } 
           Generate image
        </button>
      </form>
      {/* Right Column */}
      <div className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border border-slate-700 min-h-96'>
          <div className='flex items-center gap-3'>
            <Image className='w-5 h-5 text-green-400'/>
            <h1 className='text-xl font-semibold text-slate-200'>Generated image</h1>
          </div>
          {
            !content ? (
            <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
              <Image className='w-9 h-9'/>
              <p>
                Enter a topic and click on "Generate image" to get started
              </p>
            </div>
          </div>
            ) : (
              <div className='mt-3 h-full'>
                <img src={content} alt="image" className='w-full h-full' />
              </div>
            )
            
          }
 
      </div>
    </div>
  )
}

export default GenerateImages
