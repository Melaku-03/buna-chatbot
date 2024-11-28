import React, { useContext } from 'react'
import Footer from './Footer'
import { Context } from '../context/Context'

export default function MainBar() {
    const { setIsSidebarOpen, prompt,body } = useContext(Context);

    return (
        <main onClick={() => setIsSidebarOpen(false)} className='flex-1 relative w-full p-5 overflow-x-hidden'>
            <div className='flex flex-col justify-between md:w-[80%] mx-auto h-[90%]'>
                <div className='max-h-[80%] overflow-y-auto'>
                    {/* main-content goes here */}
                    <h2>{prompt}</h2>
                    <p>{body}</p>
                </div>
                <Footer />
            </div>
        </main>
    )
}
