import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='bg-slate-900 text-white' >
      <Navbar />
      <Hero />
      <AiTools />
       <Plan />
      <Footer />
    </div>
  )
}

export default Home
