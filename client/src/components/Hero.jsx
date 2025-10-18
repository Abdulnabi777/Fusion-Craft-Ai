import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Zap, Image, FileText, Wand2, ArrowRight, Star } from 'lucide-react'

const Hero = () => {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: FileText, text: "Write stunning articles", color: "from-purple-500 to-pink-500" },
    { icon: Image, text: "Generate beautiful images", color: "from-cyan-500 to-blue-500" },
    { icon: Wand2, text: "Transform your ideas", color: "from-orange-500 to-red-500" },
    { icon: Zap, text: "Boost productivity 10x", color: "from-green-500 to-emerald-500" }
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = features[currentFeature].icon

  return (
    <div className='relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950'>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className='relative px-4 sm:px-20 xl:px-32 flex flex-col items-center justify-center min-h-screen'>
        
        {/* Floating badge */}
        <div className='mb-8 animate-bounce'>
          <div className='inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 backdrop-blur-sm'>
            <Sparkles className='w-4 h-4 text-purple-400' />
            <span className='text-sm text-purple-300'>All Features New Available</span>
          </div>
        </div>

        {/* Main heading with animated gradient */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-bold mx-auto leading-[1.1] mb-6'>
            <span className='bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent'>
              Create Beyond
            </span>
            <br />
            <span className='bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse'>
              Imagination
            </span>
          </h1>
          
          {/* Rotating feature display */}
          <div className='flex items-center justify-center gap-3 mt-6 h-12'>
            <div className={`bg-gradient-to-r ${features[currentFeature].color} p-2 rounded-lg transition-all duration-500`}>
              <CurrentIcon className='w-6 h-6 text-white' />
            </div>
            <p className='text-xl sm:text-2xl text-gray-300 font-medium transition-all duration-500'>
              {features[currentFeature].text}
            </p>
          </div>

          <p className='mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed'>
            Harness the power of cutting-edge AI to revolutionize your creative workflow. 
            From stunning visuals to compelling copy, your next masterpiece is just one click away.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row items-center gap-4 mb-12'>
          <div className='relative group'>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            <button 
              onClick={() => navigate('/ai')} 
              className='relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-transform shadow-2xl'
            >
              Start Creating Free
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </button>
          </div>
        </div>

        {/* Stats section */}
        <div className='flex flex-wrap justify-center gap-8 sm:gap-12 text-center'>
          <div className='group cursor-pointer'>
            <div className='flex items-center justify-center gap-2 mb-2'>
              <Star className='w-5 h-5 text-yellow-400 fill-yellow-400' />
              <p className='text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform'>4.9</p>
            </div>
            <p className='text-sm text-gray-400'>Average Rating</p>
          </div>
          
          <div className='group cursor-pointer'>
            <p className='text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform'>
              50K+
            </p>
            <p className='text-sm text-gray-400'>Happy Creators</p>
          </div>
          
          <div className='group cursor-pointer'>
            <p className='text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform'>
              1M+
            </p>
            <p className='text-sm text-gray-400'>AI Generations</p>
          </div>
        </div>

        {/* Floating elements */}
        <div className='absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse' style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  )
}

export default Hero