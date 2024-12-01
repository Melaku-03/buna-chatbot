import React from 'react'
import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div className="p-5">
            <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
            >
                <motion.div
                    className="w-1 h-1 bg-secondary-color rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", }}
                />
                <motion.div
                    className="w-1 h-1 bg-secondary-color rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.2, }}
                />
                <motion.div
                    className="w-1 h-1 bg-secondary-color rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                />
            </motion.div>
        </div>


    )
}
