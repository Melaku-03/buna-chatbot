import React from 'react'
import { motion } from 'framer-motion'
import variants from '../variants'

export default function Form({ keys, user, onchange, toggleForm, headerText, subHeaderText, link }) {
    return (
        <motion.div key={keys} custom={1} variants={variants(-40)} initial="hidden" animate="fadeIn" exit={'fadeOut'} className='text-center'>
            <h1 className='text-2xl md:text-3xl'>{headerText}</h1>
            <p className='leading-9 py-1'>{subHeaderText} <span onClick={toggleForm} className='text-secondary-color cursor-pointer'>{link} </span></p>
            <div className='flex flex-col gap-3 mt-3'>
                <input value={user.username} onChange={onchange} name='username' type="text" placeholder='username' className='bg-transparent px-3 p-2 border-2 border-gray-300 outline-none rounded' autoComplete='on' />
                <input value={user.password} onChange={onchange} name='password' type="password" placeholder='password' className='bg-transparent px-3 p-2 border-2 border-gray-300 outline-none rounded' autoComplete='off' />
                <button type='submit' className='bg-secondary-color p-2 rounded'>{headerText}</button>
                <p>I agree to the <span className='underline text-secondary-color cursor-pointer'>privacy policy</span> and <span className='underline text-secondary-color cursor-pointer'>terms of service.</span></p>
            </div>
        </motion.div>
    )
}
