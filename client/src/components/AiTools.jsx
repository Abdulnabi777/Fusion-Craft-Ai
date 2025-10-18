import React, { useState, useEffect } from 'react'
import { SquarePen, Hash, Image, Eraser, Scissors, FileText, ArrowRight, Sparkles } from 'lucide-react'

const AiTools = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const AiToolsData = [
    {
      title: 'AI Content Writer',
      description: 'Generate high-quality, engaging articles on any topic with our AI writing technology.',
      Icon: SquarePen,
      bg: { from: '#3588F2', to: '#0BB0D7' },
      path: '/ai/content-craft'
    },
    {
      title: 'Email Generator',
      description: 'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
      Icon: Hash,
      bg: { from: '#B153EA', to: '#E549A3' },
      path: '/ai/email-craft'
    },
    {
      title: 'Prompt Based Image Generation',
      description: 'Create stunning visuals with our AI image generation tool, Experience the power of AI.',
      Icon: Image,
      bg: { from: '#20C363', to: '#11B97E' },
      path: '/ai/generate-images'
    },
    {
      title: 'Background Removal',
      description: 'Effortlessly remove backgrounds from your images with our AI-driven tool.',
      Icon: Eraser,
      bg: { from: '#F76C1C', to: '#F04A3C' },
      path: '/ai/remove-background'
    },
    {
      title: 'Object Removal',
      description: 'Remove unwanted objects from your images seamlessly with our AI object removal tool.',
      Icon: Scissors,
      bg: { from: '#5C6AF1', to: '#427DF5' },
      path: '/ai/remove-object'
    },
    {
      title: 'Document Reviewer',
      description: 'Get your resume reviewed by AI to improve your chances of landing your dream job.',
      Icon: FileText,
      bg: { from: '#12B7AC', to: '#08B6CE' },
      path: '/ai/docu-analyzer'
    }
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleNavigate = (path) => {
    window.location.href = path
  }

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 rounded-3xl'>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            top: '10%',
            left: '5%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            bottom: '10%',
            right: '5%',
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
          }}
        ></div>
      </div>

      <div className='relative text-center mb-16'>
        {/* Badge */}
        <div className='inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm'>
          <Sparkles className='w-4 h-4 text-purple-400' />
          <span className='text-sm text-purple-300'>6 Powerful AI Tools</span>
        </div>

        <h2 className='text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent'>
          Powerful AI Tools
        </h2>
        <p className='text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed'>
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {AiToolsData.map((tool, index) => {
          const Icon = tool.Icon
          const isHovered = hoveredIndex === index

          return (
            <div 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className='relative group rounded-2xl overflow-hidden'
              style={{'--glow-from': tool.bg.from, '--glow-to': tool.bg.to}}
            >
              {/* Glow effect */}
              <div 
                className="absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"
                style={{
                  backgroundImage: `linear-gradient(to right, ${tool.bg.from}, ${tool.bg.to})`
                }}
              ></div>

              {/* Card content */}
              <div 
                className='relative bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full cursor-pointer transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl'
                onClick={() => handleNavigate(tool.path)}
              >
                {/* Icon with animated background */}
                <div className='relative mb-6'>
                  <div 
                    className='absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300'
                    style={{
                      background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
                    }}
                  ></div>
                  <div 
                    className='relative w-16 h-16 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'
                    style={{
                      background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
                    }}
                  >
                    <Icon className='w-8 h-8 text-white' />
                  </div>
                </div>

                {/* Title */}
                <h3 className='text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors duration-300'>
                  {tool.title}
                </h3>

                {/* Description */}
                <p className='text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-300 transition-colors duration-300'>
                  {tool.description}
                </p>

                {/* Arrow indicator */}
                <div className='flex items-center gap-2 text-slate-500 group-hover:text-slate-300 transition-all duration-300'>
                  <span className='text-sm font-medium'>Try it now</span>
                  <ArrowRight 
                    className={`w-4 h-4 transform transition-all duration-300 ${
                      isHovered ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-0'
                    }`} 
                  />
                </div>

                {/* Animated corner accent */}
                <div 
                  className='absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-20 transition-opacity duration-500'
                  style={{
                    background: `radial-gradient(circle at top right, ${tool.bg.from}, transparent)`,
                  }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom decorative elements */}
      <div className='absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse'></div>
      <div className='absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-pulse' style={{ animationDelay: '1s' }}></div>
    </div>
  )
}

export default AiTools