import React, { useContext } from 'react'
import { Context } from '../context/Context'

export default function Home() {
  const { displayText, body } = useContext(Context)
  return (
    <>
      {
        displayText ?
          <div></div>
          :
          <div className='flex flex-col py-32 gap-7'>
            <h1 className='text-xl md:text-4xl font-bold'>👋 Hello! Welcome to Buna-chatbot!</h1>
            <p className='leading-7'>
              I'm here to assist you with anything you need. Whether you’re exploring, learning, or just curious, feel free to ask me anything. Let's make your experience awesome! ☕</p>
          </div>
      }
    </>
  )
}
