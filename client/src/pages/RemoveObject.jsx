import { Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const RemoveObject = () => {
     const [input, setInput] = useState('')
     const [object , setObject]= useState('')

     const onSubmitHandler = async(e) => {
      e.preventDefault();
     }

  return (
 <div className='h-full overflow-y-auto p-6 flex justify-center items-start gap-4 text-slate-300'>
      {/* Left Coulum*/}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700'>
        <div className='flex items-center gap-3'>
          <Sparkles  className='w-6 text-red-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input onChange={(e)=>  setInput(e.target.files[0])}  accept='image/*' type='file'  className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500/10 file:text-red-400 hover:file:bg-red-500/20'  required/>
        <p className='mt-6 text-sm font-medium'>Describe object to remove</p>

        <textarea onChange={(e)=> setObject(e.target.value)} value={object}  rows={4} className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 focus:ring-2 focus:ring-red-500' placeholder='e.g.. watch or spoon , Only single object name' required/>
        <p className='text-xs text-slate-500 mt-1 font-light'>
          Be specific about the object you want to remove
         </p>

         <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity'>
          <Scissors className='w-5'/>
            Remove Object
        </button>
      </form>
      {/* Right Column */}
      <div className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border border-slate-700 min-h-96'>
          <div className='flex items-center gap-3'>
            <Scissors className='w-5 h-5 text-red-400'/>
            <h1 className='text-xl font-semibold text-slate-200'>Processed image</h1>
          </div>
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
              <Scissors className='w-9 h-9'/>
              <p>
                Upload an image and describe the object to remove
               </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default RemoveObject
