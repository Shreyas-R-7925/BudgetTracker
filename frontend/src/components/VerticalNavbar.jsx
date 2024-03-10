import React from 'react';
import { imgUser } from '../assets';
import { Link } from 'react-router-dom';

const VerticalNavbar = ({username}) => {
  return (
    <div className="bg-gray-800 h-screen w-40 fixed left-0 top-0 overflow-y-auto">
      <ul className="pt-8 ml-7 content-center">
        <li className="mb-4 font-bold text-2xl text-white">Personal</li>
        <br />
        <li className="mb-4 text-white"><img src={imgUser} className='w-24'/></li>
        <li className="mb-4 text-white">{username}</li> 

        <br />
        
        <li className="mb-4"><Link to="/" className="text-white">Dashboard</Link></li>
        <li className="mb-4"><Link to="/report" className="text-white">Report</Link></li>
        <li className="mb-4"><Link to="/settings" className="text-white">Settings</Link></li>
      </ul>
    </div>
  );
};

export default VerticalNavbar;