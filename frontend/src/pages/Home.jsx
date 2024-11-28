import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from "../components/Sidebar"
import Main from '../components/Main'

export default function Home() {
  return (
    <div className='h-screen bg-primary-color text-white overflow-hidden'>
      <Navbar />
      <div className='relative h-full flex'>
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}
