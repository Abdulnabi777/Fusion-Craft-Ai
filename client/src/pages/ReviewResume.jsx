import { File, Files, FileText, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast, {Toaster} from 'react-hot-toast';
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
     const [input, setInput] = useState('')
           const [loading, setLoading] = useState(false)
          const [content, setContent] = useState('')
          const {getToken} = useAuth()
     
 
     const onSubmitHandler = async(e) => {
      e.preventDefault();
  try {
        setLoading(true)

        const formData = new FormData()
        formData.append('resume', input)
         const {data} = await axios.post('/api/ai/resume-review', formData,
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
      {/* Left Coulum*/}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700'>
        <div className='flex items-center gap-3'>
          <Sparkles  className='w-6 text-green-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>Resume Review </h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Resume</p>

        <input onChange={(e)=> setInput(e.target.files[0])} accept='application/pdf' type='file'  className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500/10 file:text-green-400 hover:file:bg-green-500/20'  required/>
        <p className='text-xs text-slate-500 mt-1 font-light'>
        Support PDF format only
        </p>

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity'>
                  {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>:   <FileText className='w-5'/>
          }             
          Resume Review
        </button>
      </form>
      {/* Right Column */}
      <div className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border border-slate-700 min-h-96 max-h-[600px]'>
          <div className='flex items-center gap-3'>
            <FileText className='w-5 h-5 text-green-400'/>
            <h1 className='text-xl font-semibold text-slate-200'>Analysis Results</h1>
          </div>
          {
            !content ? (
                        <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
              <FileText className='w-9 h-9'/>
              <p>
                Upload an resume and click on "Review Resume" to get started
               </p>
            </div>
          </div>
            ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
               <div className='reset-tw'>
                 <Markdown>
                   {content }
                 </Markdown>
                </div>               
              </div>
            )
          }
 
      </div>
    </div>
  )
}

export default ReviewResume
