import React from 'react'
import { FiInfo } from 'react-icons/fi'
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

const Information = ({setStart}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center z-[999] p-4 font-medium bg-[#171717] bg-opacity-60'>
        <motion.div className='flex flex-col justify-center items-center max-w-xl w-full bg-[#171717] bg-opacity-95 shadow-xl shadow-[#4CCD99] rounded-3xl p-4'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        >
        <div className="p-4 text-white rounded-full shadow-2xl shadow-[#4CCD99]">
          <FiInfo size={40} />
        </div>
        <div className='p-4 text-center sm:text-lg text-sm'>
            This React and Firebase app demonstrates core CRUD operations allowing users to manage data entries effectively.
            It also includes query functions for filtering and sorting data, showcasing Firebase's querying capabilities.
        </div>
        <div className="w-full py-2">
        <div className="px-5 pt-4 shadow-lg text-gray-100 sm:text-sm  text-xs font-mono bg-gray-800  pb-6 rounded-lg">
            <div className="top mb-2 flex">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
                <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex py-4">
                <span className="text-green-400">computer:~$</span>
                <p className="flex-1 typing items-center pl-2">
                    <TypeAnimation
                        sequence={[
                            'npm install firebase',
                            1000,
                            ' ',
                            1000,
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity} // Makes the animation loop
                        style={{ display: 'inline-block' }}
                    />
                </p>
            </div>
        </div>
        </div>
        <div className='px-4 py-2 my-4 rounded-full border-2 font-medium sm:text-lg text-sm hover:text-[#4CCD99] hover:border-[#4CCD99] duration-200 cursor-pointer'
        onClick={setStart}>
            Got it 
        </div>
        </motion.div>
        
    </div>
    
  )
}

export default Information