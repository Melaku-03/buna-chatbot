import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { isSidebarOpen, chats, toggleSidebar } = useContext(Context);

  return (
    <aside className={`w-full md:w-1/4 lg:w-1/5 py-4 ${isSidebarOpen ? "" : "hidden"} bg-opacity-5 bg-white lg:block`}>
      <h2 className='text-lg md:text-2xl border-b px-4 p-2 text-secondary-color font-semibold'>Chats</h2>
      {/* recent chats */}
      <div className='mt-10 flex flex-col gap-3 h-[100%] overflow-y-scroll'>
        {
          chats.length > 0 ?
            chats?.map(chat => (
              <Link to={chat._id} onClick={ toggleSidebar} key={chat._id} className='px-4 p-2 cursor-pointer hover:bg-secondary-color hover:bg-opacity-10'>{chat.title}</Link>
            ))
            : <div className='px-4'>No recent chat yet.</div>
        }
      </div>
    </aside>
  )
}
