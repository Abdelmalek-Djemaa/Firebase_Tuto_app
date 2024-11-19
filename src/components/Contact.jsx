import React from 'react'
import { AiOutlineFullscreenExit } from 'react-icons/ai'
import { FaMailBulk } from 'react-icons/fa'
import { motion } from "framer-motion";


const Contact = ({setShowContact}) => {
  return (
    <div className='fixed flex flex-col justify-center items-center top-0 z-[999]  bottom-0 left-0 right-0 w-full h-full bg-[#171717] bg-opacity-60 px-4'>
        <motion.div className='bg-[#171717] relative flex flex-col justify-center items-center max-w-lg w-full shadow-xl shadow-[#4CCD99] rounded-3xl pt-8'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
        >
            <button
                onClick={setShowContact}
                className="absolute right-3 top-7 transform -translate-y-1/2 hover:scale-105 rounded-full p-1 bg-[#4CCD99] duration-300"
            >
                <AiOutlineFullscreenExit size={18} />
            </button>
            <FaMailBulk size={40}/>
            <span className='py-8 cursor-pointer hover:scale-105 duration-200'>a_djemaa@estin.dz</span>
            <span className='text-sm text-center p-2'>Copy Right © 2024 Abdelmalek Djemaa Team</span>
        </motion.div>
    </div>
  )
}

export default Contact