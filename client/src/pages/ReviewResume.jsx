import { FileText, Sparkles, FileSearch, Clipboard, Check, Code } from 'lucide-react'
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
  const [fileName, setFileName] = useState('')
  const [copiedLatex, setCopiedLatex] = useState(false)
  const [copiedAll, setCopiedAll] = useState(false)
  const {getToken} = useAuth()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setInput(file)
    setFileName(file?.name || '')
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    
    if (!input) {
      toast.error('Please upload a PDF file')
      return
    }

    try {
      setLoading(true)
      setContent('') // Clear previous content
      setCopiedLatex(false) // Reset copy states
      setCopiedAll(false)

      const formData = new FormData()
      formData.append('resume', input)
      
      const {data} = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      
      if(data.success){
        setContent(data.content)
        toast.success('Document analyzed successfully!')
      } else {
        toast.error(data.message || 'Failed to analyze document')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response?.data?.message || error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setInput('')
    setFileName('')
    setContent('')
    setCopiedLatex(false)
    setCopiedAll(false)
  }

  // Extract LaTeX code from markdown content
  const extractLatexCode = (markdownContent) => {
    const latexRegex = /```latex\n([\s\S]*?)```/;
    const match = markdownContent.match(latexRegex);
    return match ? match[1].trim() : null;
  }

  const handleCopyLatex = () => {
    const latexCode = extractLatexCode(content);
    if (latexCode) {
      navigator.clipboard.writeText(latexCode);
      setCopiedLatex(true);
      toast.success('LaTeX code copied to clipboard!');
      setTimeout(() => setCopiedLatex(false), 2000);
    } else {
      toast.error('No LaTeX code found');
    }
  }

  const handleCopyAll = () => {
    if (content) {
      // Copy the raw markdown content
      navigator.clipboard.writeText(content);
      setCopiedAll(true);
      toast.success('Full analysis copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2000);
    }
  }

  return (
    <div className='h-full overflow-y-auto p-6 flex justify-center items-start gap-4 text-slate-300'>
      <Toaster position="top-center" />
      
      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 h-6 text-green-400'/>
          <h1 className='text-xl font-semibold text-slate-200'>Document Reviewer</h1>
        </div>
        
        <p className='mt-4 text-sm text-slate-400'>
          Upload a resume for detailed analysis with ATS scoring and LaTeX code, or upload any other document for a comprehensive overview.
        </p>

        <p className='mt-6 text-sm font-medium text-slate-200'>Upload Document</p>

        <input 
          onChange={handleFileChange} 
          accept='application/pdf' 
          type='file'  
          className='w-full p-2 px-3 mt-2 bg-slate-800 outline-none text-sm rounded-md border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500/10 file:text-green-400 hover:file:bg-green-500/20'  
          required
        />
        
        {fileName && (
          <p className='text-xs text-green-400 mt-2 font-medium'>
            Selected: {fileName}
          </p>
        )}
        
        <p className='text-xs text-slate-500 mt-1 font-light'>
          Supports PDF format only
        </p>

        <div className='flex gap-3 mt-6'>
          <button 
            type='submit'
            disabled={loading || !input} 
            className='flex-1 flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 text-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            ) : (
              <FileSearch className='w-5 h-5'/>
            )}             
            {loading ? 'Analyzing...' : 'Analyze Document'}
          </button>
          
          {(input || content) && (
            <button 
              type='button'
              onClick={resetForm}
              className='px-4 py-2.5 text-sm rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors'
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {/* Right Column */}
      <div className='w-full max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border border-slate-700 min-h-96 max-h-[600px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <FileText className='w-5 h-5 text-green-400'/>
            <h1 className='text-xl font-semibold text-slate-200'>Analysis Results</h1>
          </div>
          
          {content && (
            <div className='flex items-center gap-2'>
              {/* Copy All Button */}
              <button 
                onClick={handleCopyAll} 
                className='flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700/50 hover:bg-slate-700 transition-colors text-xs border border-slate-600'
                title="Copy entire analysis"
              >
                {copiedAll ? (
                  <>
                    <Check className='w-4 h-4 text-green-400' />
                    <span className='text-green-400'>Copied!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className='w-4 h-4' />
                    <span>Copy All</span>
                  </>
                )}
              </button>

              {/* Copy LaTeX Button - Only show if LaTeX code exists */}
              {extractLatexCode(content) && (
                <button 
                  onClick={handleCopyLatex} 
                  className='flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-600/20 hover:bg-green-600/30 transition-colors text-xs border border-green-600/50'
                  title="Copy LaTeX code only"
                >
                  {copiedLatex ? (
                    <>
                      <Check className='w-4 h-4 text-green-400' />
                      <span className='text-green-400'>LaTeX Copied!</span>
                    </>
                  ) : (
                    <>
                      <Code className='w-4 h-4 text-green-400' />
                      <span className='text-green-400'>Copy LaTeX</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        
        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-slate-500 text-center px-4'>
              <FileText className='w-9 h-9'/>
              <div>
                <p className='font-medium mb-2'>No analysis yet</p>
                <p className='text-xs'>
                  Upload a document and click "Analyze Document" to get started
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-4 h-full overflow-y-auto text-sm'>
            <div className='prose prose-sm prose-invert max-w-none'>
              <Markdown
                components={{
                  h1: ({node, ...props}) => <h1 className='text-xl font-bold text-slate-200 mt-4 mb-2' {...props} />,
                  h2: ({node, ...props}) => <h2 className='text-lg font-semibold text-slate-300 mt-3 mb-2' {...props} />,
                  h3: ({node, ...props}) => <h3 className='text-base font-semibold text-slate-300 mt-2 mb-1' {...props} />,
                  p: ({node, ...props}) => <p className='text-slate-400 mb-2 leading-relaxed' {...props} />,
                  ul: ({node, ...props}) => <ul className='list-disc pl-5 mb-3 text-slate-400' {...props} />,
                  ol: ({node, ...props}) => <ol className='list-decimal pl-5 mb-3 text-slate-400' {...props} />,
                  li: ({node, ...props}) => <li className='mb-1' {...props} />,
                  strong: ({node, ...props}) => <strong className='text-slate-300 font-semibold' {...props} />,
                  code: ({node, inline, className, children, ...props}) => {
                    const isLatex = className?.includes('language-latex');
                    
                    if (inline) {
                      return <code className='bg-slate-700 text-green-400 px-1 py-0.5 rounded text-xs' {...props}>{children}</code>
                    }
                    
                    return (
                      <div className='relative group'>
                        <code 
                          className={`block ${isLatex ? 'bg-slate-900 border border-green-900/30' : 'bg-slate-900'} text-green-400 p-4 rounded-md text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre`} 
                          {...props}
                        >
                          {children}
                        </code>
                      </div>
                    )
                  },
                  pre: ({node, ...props}) => <pre className='bg-slate-900 rounded-md overflow-x-auto mb-3' {...props} />
                }}
              >
                {content}
              </Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewResume