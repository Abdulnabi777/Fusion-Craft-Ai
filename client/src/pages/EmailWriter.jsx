import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Clipboard, Mail, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const EmailWriter = () => {
  const emailCategories = ['Professional', 'Formal', 'Casual', 'Follow-up', 'Apology', 'Thank You', 'Job Application', 'Cold Email', 'Introduction', 'Request']
  
  const [selectedCategory, setSelectedCategory] = useState('Professional')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const {getToken} = useAuth()

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate a professional email about "${input}" in the category "${selectedCategory}". The email should have a clear subject line, greeting, body content, and a proper closing.`;

      const {data} = await axios.post('/api/ai/generate-blog-title', {prompt},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )
      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };
 


  return (
    <div className='h-full overflow-y-auto p-6 flex justify-center items-start gap-4 text-slate-300'>
      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-pink-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>AI Email Writer</h1>
        </div>
        
        <p className='mt-6 text-sm font-medium'>Email Topic</p>
        <input 
          onChange={(e) => setInput(e.target.value)} 
          value={input} 
          type="text" 
          className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 focus:ring-2 focus:ring-pink-500' 
          placeholder='Request for project update meeting...' 
          required
        />
        
        <p className='mt-4 text-sm font-medium'>Email Type</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {emailCategories.map((item) => (
            <span 
              onClick={() => setSelectedCategory(item)} 
              key={item} 
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-colors ${selectedCategory === item ? 'bg-pink-600 text-white border-pink-500' : 'text-slate-400 border-slate-600 hover:bg-slate-700'}`}
            >
              {item}
            </span>
          ))}
        </div>
        
        <button 
          disabled={loading} 
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <Mail className='w-5'/>
          )}
          Generate Email
        </button>
      </form>

      {/* Right Column */}
      <div className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border border-slate-700 min-h-96'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Mail className='w-5 h-5 text-pink-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>Generated Email</h1>
        </div>
        {content && (
            <button onClick={handleCopy} className='p-1.5 rounded-md hover:bg-slate-700'>
              <Clipboard className='w-5 h-5' />
            </button>
          )}
        </div>
        
        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
              <Mail className='w-9 h-9'/>
              <p className='text-center'>
                Enter a topic and select an email type, then click "Generate Email" to create your professional email
              </p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-300'>
            <div className='reset-tw prose prose-invert max-w-none'>
              <Markdown>
                {content}
              </Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailWriter