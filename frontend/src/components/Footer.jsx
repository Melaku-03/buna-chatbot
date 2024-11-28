import React, { useContext } from 'react'
import { BiSolidSend } from 'react-icons/bi'
import { Context } from '../context/Context'

export default function Footer() {
  const { run, prompt, promptChangeHandler, chatToBeUpdateId } = useContext(Context);

  return (
    <footer>
      <form onSubmit={(e) => run(e, prompt, chatToBeUpdateId)} className='flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-4'>
        <textarea value={prompt} onChange={promptChangeHandler} name="prompt" className='w-full bg-transparent resize-none border-none outline-none flex-1' placeholder='Message' />
        <button type='submit'><BiSolidSend className={`text-xl md:text-2xl cursor-pointer ${prompt.trim().length ? 'opacity-100' : 'opacity-25'}`} /></button>
      </form>
    </footer>
  )
}
