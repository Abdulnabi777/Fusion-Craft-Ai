import React, { useState, useEffect } from 'react'
import { PricingTable } from '@clerk/clerk-react'
import { Sparkles } from 'lucide-react'

const Plan = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-24 my-20 rounded-3xl'>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            bottom: '20%',
            right: '10%',
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
          }}
        ></div>
      </div>

      <div className='max-w-5xl mx-auto relative z-10 px-4'>
        <div className='text-center mb-16'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm animate-bounce' style={{ animationDuration: '3s' }}>
            <Sparkles className='w-4 h-4 text-purple-400 animate-spin' style={{ animationDuration: '3s' }} />
            <span className='text-sm text-purple-300'>Flexible Pricing Plans</span>
          </div>

          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-500'>
            Choose Your Plan
          </h2>
          <p className='text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed'>
            Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
          </p>
        </div>

        <div className='mt-14 max-sm:mx-8 relative'>
          {/* Glow effect behind pricing table */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-50"></div>
          
          <div className='relative'>
            <PricingTable />
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse'></div>
      <div className='absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-pulse' style={{ animationDelay: '1s' }}></div>
    </div>
  )
}

export default Plan