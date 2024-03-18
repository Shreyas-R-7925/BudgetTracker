import React from 'react';
import { imgUser, settings, analysis, home, tree } from '../assets';
import { Link } from 'react-router-dom';

const VerticalNavbar = ({username}) => {
  return (
    <div className="bg-gray-800 h-screen w-40 fixed left-0 top-0 overflow-y-auto">
      <ul className="pt-8 ml-7 content-center">
        <li className="mb-4 ml-1 text-2xl font-mono text-[#fbbf24]"><img src={tree} className='ml-5 w-12 h-12'/>TxnTree</li>
        <br />
        <li className="mb-4 text-white"><img src={imgUser} className='w-24'/></li>
        <li className="mb-4 font-mono text-xl font-bold text-green-400">{username}</li> 

        <br />
        
        <li className="mb-6"><Link to="/" className="font-mono text-white font-bold text-base"><img src={home} className='w-8 h-8'/>Dashboard</Link></li>
        <li className="mb-6"><Link to="/report" className="font-mono text-white font-bold text-base"><img src={analysis} className='w-8 h-8'/>Analysis</Link></li>
        <li className="mb-6"><Link to="/settings" className="font-mono text-white font-bold text-base"><img src={settings} className='w-8 h-8'/>Settings</Link></li>
      </ul>
    </div>
  );
};

export default VerticalNavbar;