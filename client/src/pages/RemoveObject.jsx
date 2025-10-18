import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Download, Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const RemoveObject = () => {
     const [input, setInput] = useState('')
     const [object, setObject] = useState('')
     const [loading, setLoading] = useState(false)
     const [content, setContent] = useState('')
     const {getToken} = useAuth()

     const onSubmitHandler = async(e) => {
      e.preventDefault();
      setLoading(true) // Move loading to the top
      
      try {
        // Validate object name first
        if (object.trim().split(' ').length > 1){
          toast.error('Please enter a single object name');
          return; // Return inside try block so finally will run
        }

        if (!input) {
          toast.error('Please select an image');
          return;
        }

        const formData = new FormData()
        formData.append('image', input)
        formData.append('object', object)

        const {data} = await axios.post('/api/ai/remove-image-object', formData, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        
        console.log(data)
        if(data.success){
          setContent(data.content)
          toast.success("Object removed successfully!")
        } else {
          toast.error(data.message || "Couldn't remove the object.")
        }
      } catch (error) {
          console.error('Error:', error);
          toast.error(error.response?.data?.message || error.message || "An error occurred.")
      } finally {
        setLoading(false) // Always runs, even after return
      }
   }
   const handleDownload = () => {
    const link = document.createElement('a');
    link.href = content;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='h-full overflow-y-auto p-6 flex justify-center items-start gap-4 text-slate-300'>
      <Toaster />
      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-red-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input 
          onChange={(e) => setInput(e.target.files[0])} 
          accept='image/*' 
          type='file' 
          className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500/10 file:text-red-400 hover:file:bg-red-500/20' 
          required
        />
        
        <p className='mt-6 text-sm font-medium'>Describe object to remove</p>

        <textarea 
          onChange={(e) => setObject(e.target.value)} 
          value={object} 
          rows={4} 
          className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 focus:ring-2 focus:ring-red-500' 
          placeholder='e.g. watch or spoon, Only single object name' 
          required
        />
        <p className='text-xs text-slate-500 mt-1 font-light'>
          Be specific about the object you want to remove
        </p>

        <button 
          disabled={loading} 
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {
            loading ? 
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : 
              <Scissors className='w-5'/>
          }          
          Remove Object
        </button>
      </form>
      
      {/* Right Column */}
      <div className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border border-slate-700 min-h-96'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Scissors className='w-5 h-5 text-red-400'/>
            <h1 className='text-xl font-semibold text-slate-200'>Processed image</h1>
          </div>
          {content && (
            <button onClick={handleDownload} className='p-1.5 rounded-md hover:bg-slate-700'>
              <Download className='w-5 h-5' />
            </button>
          )}
        </div>
        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
                <Scissors className='w-9 h-9'/>
                <p>
                  Upload an image and describe the object to remove
                </p>
              </div>
            </div>
          ) : (
            <div> 
              <img src={content} alt="Processed" className='mt-3 w-full h-full object-contain' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RemoveObject