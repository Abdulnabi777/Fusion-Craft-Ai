import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import EmailWriter from './pages/EmailWriter'
import Dashboard from './pages/Dashboard.jsx'
import WriteArticle from './pages/WriteArticle.jsx'
import RemoveBackground from './pages/RemoveBackground.jsx'
import Community from './pages/Community.jsx' 
import ReviewResume from './pages/ReviewResume.jsx'
import RemoveObject from './pages/RemoveObject.jsx'
import GenerateImages from './pages/GenerateImages.jsx'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
const App = () => {

  const {getToken} = useAuth()
  useEffect(() => {
    getToken().then((token)=>console.log(token));
  }, [])


  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/ai' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='content-craft' element={<WriteArticle />} />
        <Route path='email-craft' element={<EmailWriter />} />
        <Route path='community' element={<Community />} />
        <Route path='remove-background' element={<RemoveBackground />} />
        <Route path='docu-analyzer' element={< ReviewResume />} />
        <Route path='remove-object' element={<  RemoveObject />} />
        <Route path='generate-images' element={<  GenerateImages />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
