import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItems = ({item}) => {
    const [expanded, setExpanded] = useState(false)
  return (
    <div onClick={()=> setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800/70 transition-colors'>
      <div className='flex justify-between items-center gap-4'>
        <div>
            <h2 className="text-slate-200">{item.prompt}</h2>
            <p className='text-slate-400'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <button className='bg-slate-700 border border-slate-600 text-slate-300 px-4 py-1 rounded-full text-xs'>
            {item.type}
        </button>
      </div>
      {
        expanded && (
            <div>
                {item.type === 'image' ? (
                    <div>
                        <img src={item.content} alt="image" className='mt-3 w-full max-w-md' />
                    </div>
                ): (
                    <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-300'>
                        <div className='reset-tw prose prose-invert prose-sm'>
                            <Markdown>
                            {item.content}
                            </Markdown>
                        </div>
                    </div>
                )}
            </div>
        )
      }
    </div>
  )
}

export default CreationItems
