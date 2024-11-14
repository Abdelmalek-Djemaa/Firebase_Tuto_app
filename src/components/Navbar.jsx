import React from 'react'
import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 flex flex-row justify-between items-center sm:p-8 p-6 w-full z-[100]'>
       <img src={logo} alt="" className='sm:h-10 h-8'/>
        <div className='px-3 py-2 rounded-full border-2 font-medium sm:text-lg text-sm hover:text-[#4CCD99] hover:border-[#4CCD99] duration-200 cursor-pointer'>
            Contact Us
        </div>

    </div>
  )
}

export default Navbar