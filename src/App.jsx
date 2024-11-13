import React from 'react'
import Splash from './components/Splash'
import bg from "./assets/bg.svg"
import vector from "./assets/Vector.svg"
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="fixed h-full w-full flex flex-col justify-center items-center bg-dark bg-cover bg-center font-poppins text-white"
    style={{backgroundImage: `url(${bg})`}}>
      <img src={vector} className='absolute bottom-0 left-0 w-[40%] sm:w-[20%]'/>
      <img src={vector} className='absolute bottom-0 right-0 w-[40%] sm:w-[20%] scale-x-[-1]'/>
      <Navbar/>
      <Splash/>
      <Footer/>
    </div>
  )
}

export default App