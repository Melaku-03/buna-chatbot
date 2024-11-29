import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Navigate } from 'react-router-dom'

export default function ChatLayout() {
    const { setIsSidebarOpen, fetchChats, body, chats } = useContext(Context);

    useEffect(() => {
        fetchChats();
    }, [body]);
    return (
        <>
            {
                chats ?
                    <div className='h-screen bg-primary-color text-white overflow-hidden'>
                        <Navbar />
                        <div className='relative h-full flex'>
                            <Sidebar />
                            <main onClick={() => setIsSidebarOpen(false)} className='flex-1 relative w-full p-5 overflow-x-hidden'>
                                <div className='flex flex-col justify-between md:w-[80%] mx-auto h-[90%]'>
                                    <div className='max-h-[80%] overflow-y-auto'>
                                        {/* main-content goes here */}
                                        <Outlet />
                                    </div>
                                    <Footer />
                                </div>
                            </main>
                        </div>
                    </div>
                    : <Navigate to={"/login"} />
            }
        </>
    )
}
