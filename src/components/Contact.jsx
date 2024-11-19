import React from 'react'
import { AiOutlineFullscreenExit } from 'react-icons/ai'
import { FaMailBulk } from 'react-icons/fa'

const Contact = ({setShowContact}) => {
  return (
    <div className='fixed flex flex-col justify-center items-center top-0 z-[999]  bottom-0 left-0 right-0 w-full h-full bg-[#171717] bg-opacity-60'>
        <div className='bg-[#171717] relative flex flex-col justify-center items-center max-w-lg w-full shadow-xl shadow-[#4CCD99] rounded-3xl py-8'>
            <button
                onClick={setShowContact}
                className="absolute right-3 top-7 transform -translate-y-1/2 hover:scale-105 rounded-full p-1 bg-[#4CCD99] duration-300"
            >
                <AiOutlineFullscreenExit size={18} />
            </button>
            <FaMailBulk size={30}/>
            a_djemaa@estin.dz
        </div>
    </div>
  )
}

export default Contact