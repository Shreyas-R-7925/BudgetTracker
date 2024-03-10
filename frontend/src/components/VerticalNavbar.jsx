import React from 'react';
import { imgUser } from '../assets';

const VerticalNavbar = () => {
  return (
    <div className="bg-gray-800 h-screen w-40 fixed left-0 top-0 overflow-y-auto">
      <ul className="pt-8 ml-7 content-center">
        <li className="mb-4 font-bold text-2xl text-white">Personal</li>
        <br />
        <li className="mb-4 text-white"><img src={imgUser} className='w-24'/></li>
        <li className="mb-4 text-white">Username</li> 

        <br />
        
        <li className="mb-4"><a href="/" className="text-white">Dashboard</a></li>
        <li className="mb-4"><a href="/report" className="text-white">Report</a></li>
        <li className="mb-4"><a href="/settings" className="text-white">Settings</a></li>
      </ul>
    </div>
  );
};

export default VerticalNavbar;