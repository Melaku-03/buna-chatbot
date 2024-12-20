import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ChatLayout from './layout/ChatLayout'
import Chat from './pages/Chat'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ChatLayout />} >
          <Route index element={<Home />} />
          <Route path=':id' element={<Chat />} />
        </Route>
      </Routes>
    </div>
  )
}
