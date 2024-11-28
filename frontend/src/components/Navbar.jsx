import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { BiMenuAltLeft } from "react-icons/bi"
import { AiOutlineMessage } from "react-icons/ai"
export default function Navbar() {
    const { toggleSidebar } = useContext(Context);

    return (
        <nav className='p-5 flex items-center justify-between text-2xl md:text-4xl text-gray-300 sticky top-0 z-10 bg-primary-color'>
            <BiMenuAltLeft className='cursor-pointer' onClick={toggleSidebar} />
            <AiOutlineMessage className='cursor-pointer hover:text-secondary-color' />
        </nav>
    )
}
