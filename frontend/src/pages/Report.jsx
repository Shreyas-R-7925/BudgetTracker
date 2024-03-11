import React, { useState } from 'react';
import { VerticalNavbar, Boxes } from '../components';
import { food, bill, cash, shopping, leaf } from '../assets';

const Report = ({ username, id }) => {
  console.log("in report page", id);

  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='flex flex-col'>
      
      <h1 className='ml-20 text-center text-2xl font-bold'>Report</h1>
      <VerticalNavbar username={username} />

      <div className="ml-40 mt-14 flex flex-wrap">
        {/* <Boxes color="cyan" comment="Expenses" image={cash} /> */}
        <Boxes color="green" comment="Food" image={food} />
        <Boxes color="orange" comment="Health" image={bill} />
        <Boxes color="black" comment="Shopping" image={bill} />
        <Boxes color="orange" comment="Bills" image={shopping} />
        <Boxes color="black" comment="Entertainment" image={food} />
        <Boxes color="brown" comment="Others" image={leaf} />
        
      </div>


      <div className="ml-40 mt-14 flex flex-wrap">
      <Boxes color="cyan" comment="Total expenses" image={cash} />

        <input
          type="text"
          id="search"
          name="search"
          value={input}
          placeholder='Search by mm-yyyy'
          onChange={handleChange}
          className="shadow appearance-none border rounded-none mt-40 w-54 ml-10 h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        &nbsp;
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 w-20 h-10 mt-40 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go 
        </button>
      </div>
    </div>
  );
};

export default Report;
