import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { Link } from "react-router-dom";
import Loading from './Loading';

export default function Sidebar() {
  const { loading, isSidebarOpen, chats, toggleSidebar } = useContext(Context);

  return (
    <aside className={`w-full md:w-1/4 lg:w-1/5 py-4 ${isSidebarOpen ? "" : "hidden"} bg-opacity-5 bg-white lg:block`}>
      <h2 className='text-lg md:text-2xl border-b px-4 p-2 text-secondary-color opacity-50 font-semibold'>Chats</h2>
      {/* recent chats */}
      <div className='py-10 flex flex-col gap-3 h-[85%] md:h-[80%] overflow-y-auto overflow-x-hidden'>
        {
          loading ? 
          <Loading/>
            :
            chats.length > 0 ?
              chats?.map(chat => (
                <Link to={chat._id} onClick={toggleSidebar} key={chat._id} className='px-4 p-2 cursor-pointer hover:bg-secondary-color hover:bg-opacity-10 border-b border-gray-500'>{chat.title}</Link>
              ))
              : <div className='px-4'>No recent chat yet.</div>
        }
      </div>
    </aside>
  )
}
