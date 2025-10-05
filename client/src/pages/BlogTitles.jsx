import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const BlogTitles = () => {
  const  blogCategories = [ 'General' , 'Technology' , 'Health' , 'Finance' , 'Travel' , 'Food' , 'Lifestyle' , 'Education' , 'Entertainment' , 'Sports' ]
  
     const [selectedCategory, setSelectedCategory] = useState('General')
     const [input, setInput] = useState('')

     const onSubmitHandler = async(e) => {
      e.preventDefault();
     }

  return (
 <div className='h-full overflow-y-auto p-6 flex justify-center items-start gap-4 text-slate-300'>
      {/* Left Coulum*/}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700'>
        <div className='flex items-center gap-3'>
          <Sparkles  className='w-6 text-pink-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>AI Title Generator </h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 focus:ring-2 focus:ring-pink-500' placeholder='The Future of Artificial Intelligence is...' required/>
        <p className='mt-4 text-sm font-medium'>
        Category
        </p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {blogCategories.map((item )=>(
            <span onClick={()=>  setSelectedCategory(item)} key={item} 
            className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-colors ${selectedCategory === item ? 'bg-pink-600 text-white border-pink-500' : 'text-slate-400 border-slate-600 hover:bg-slate-700'}`}>
              {item}
            </span>
          ))}
        </div>
        <br/>
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity'>
          <Hash className='w-5'/>
          Generate title
        </button>
      </form>
      {/* Right Column */}
      <div className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border border-slate-700 min-h-96'>
          <div className='flex items-center gap-3'>
            <Hash className='w-5 h-5 text-pink-400'/>
            <h1 className='text-xl font-semibold text-slate-200'>Generated titles</h1>
          </div>
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
              <Hash className='w-9 h-9'/>
              <p>
                Enter a topic and click on "Generate title" to create a unique title
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default BlogTitles
