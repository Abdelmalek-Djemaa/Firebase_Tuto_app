import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import logo from '../assets/firebase.svg';
import MainApp from './MainApp';
import { HiArrowRightStartOnRectangle } from 'react-icons/hi2';

const Splash = () => {
  const [showMainApp, setShowMainApp] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center space-y-8 p-2 text-center font-medium sm:text-4xl text-3xl">
      <div className="relative sm:max-w-[250px] max-w-[210px] rounded-full p-12 mb-8">
        <div className="absolute inset-0 bg-[#4CCD99] blur-lg rounded-full"></div>
        <img src={logo} alt="Firebase Logo" className="relative z-10" />
      </div>

      <TypeAnimation
        sequence={['Firebase Tuto', 1000, 'A Visionary Guide to Firebase', 2000]}
        wrapper="span"
        cursor
        repeat={Infinity}
        style={{ display: 'inline-block',  height: '70px' }}
      />

      <div className='flex flex-row justify-center items-center space-x-2 py-3 px-4 rounded-full text-gray-800 font-medium sm:text-lg text-sm shadow-2xl shadow-[#4CCD99] bg-[#4CCD99] hover:scale-105 duration-200 cursor-pointer'
      onClick={()=> setShowMainApp(true)}>
            <span>
            Get Started
            </span>
            <HiArrowRightStartOnRectangle size={30} />
      </div>

      {showMainApp && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <MainApp setShowMainApp={() => setShowMainApp(false)} />
        </div>
      )}
    </div>
  );
};

export default Splash;
