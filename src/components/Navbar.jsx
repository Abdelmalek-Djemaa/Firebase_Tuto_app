import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import Contact from './Contact'

const Navbar = () => {
  const[showContact , setShowContact] = useState(false)
  return (
    <div className='fixed top-0 left-0 right-0 flex flex-row justify-between items-center sm:p-8 p-6 w-full z-[100]'>
       <img src={logo} alt="" className='sm:h-10 h-8'/>
        <div className='px-3 py-2 rounded-full border-2 font-medium sm:text-lg text-sm hover:text-[#4CCD99] hover:border-[#4CCD99] duration-200 cursor-pointer'
        onClick={()=>setShowContact(true)}>
            Contact Us
        </div>
        {showContact && <Contact setShowContact={()=>setShowContact(false)}/>}
    </div>
  )
}

export default Navbar