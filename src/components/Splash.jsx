import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import logo from '../assets/firebase.svg';
import { RiDeleteBin4Line, RiStickyNoteAddLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { LuFileSearch } from 'react-icons/lu';
import Add from './Add';

const Splash = () => {
  const [addCard , setShowAddCard] = useState(false)
  return (
    <div className="flex flex-col justify-center space-y-8 items-center sm:text-4xl text-3xl p-2 text-center font-medium">
      <div className="relative sm:max-w-[250px] max-w-[210px] rounded-full p-12 mb-8">
        <div className="absolute inset-0 bg-[#4CCD99] blur-lg rounded-full"></div>
        <img
        src={logo}
        alt=""
        className="relative z-10"
        />
      </div>
      <div className="sm:max-w-2xl h-16">
        <TypeAnimation
          sequence={[
            'Firebase Tuto', // Text to type out
            1000, // Wait 1 second
            'A Visionary Guide to Firebase', // Replace with this text
            2000, // Wait 2 seconds
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity} // Makes the animation loop
          style={{ display: 'inline-block' }}
        />
      </div>
      
      <div className="flex space-x-4">
        {/* Add Button */}
        <button className="p-4 text-white rounded-full shadow-2xl shadow-[#4CCD99] hover:bg-[#4CCD99] transition-all"
        onClick={()=>setShowAddCard(true)}>
          <RiStickyNoteAddLine size={28} />
        </button>
        
        {/* Edit Button */}
        <button className="p-4 text-white rounded-full shadow-2xl shadow-[#4CCD99] hover:bg-[#4CCD99] transition-all">
          <FiEdit size={28} />
        </button>
        
        {/* Delete Button */}
        <button className="p-4 text-white rounded-full shadow-2xl shadow-[#4CCD99] hover:bg-[#4CCD99] transition-all">
          <RiDeleteBin4Line size={28} />
        </button>
        
        {/* Query/Search Button */}
        <button className="p-4 text-white rounded-full shadow-2xl shadow-[#4CCD99] hover:bg-[#4CCD99] transition-all">
          <LuFileSearch size={28} />
        </button>
      </div>
      {addCard&& <Add setShowAddCard={()=>setShowAddCard(false)}/>}
    </div>
  );
};

export default Splash;
