import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { BiMenuAltLeft } from "react-icons/bi"
import { AiOutlineMessage } from "react-icons/ai"
import { replace, useNavigate } from 'react-router-dom'
export default function Navbar() {
    const history = useNavigate();
    const { toggleSidebar, setIsNewChat } = useContext(Context);

    const newChat = () => {
        history('/', replace);
        setIsNewChat(true);
    }
    return (
        <nav className='p-5 flex items-center justify-between text-2xl md:text-4xl text-gray-300 sticky top-0 z-10 bg-primary-color'>
            <BiMenuAltLeft className='cursor-pointer' onClick={toggleSidebar} />

            <AiOutlineMessage className='cursor-pointer hover:text-secondary-color' onClick={newChat} />
        </nav>
    )
}
