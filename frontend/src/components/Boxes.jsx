import React from 'react';

const Boxes = ({ color, comment, amount, image }) => { 
 
  let boxStyle = {
    backgroundColor: color,
    width: '158px',
    height: '100px',
    display: 'inline-block', // Display boxes inline
    marginRight: '10px', // Add margin between boxes
    color: 'white'
  };

  if (color === 'cyan') {
    // If color is blue, add special properties
    boxStyle = {
      ...boxStyle, // Spread the existing styles
      width: '350px', // Add width of 500px
      height: '160px', // Adjust height as needed
      fontSize: '40px', // Adjust font size as needed
      textAlign: 'center',
      marginTop: '20px', // Center align text
      padding: '20px 10px 20px 10px'
      // Add any other special properties for blue color
    };
  }

  return (
    <div className="rounded-lg flex px-1 py-1" style={boxStyle}>
      <div className='text-lg flex justify-center items-center'>
        <h1 className='text-neutral-950 text-lg'> {comment.toUpperCase()} </h1>
      </div>  
      <div className='flex flex-row mt-4'>
        <img src={image} className='w-10 h-10'></img>
        &nbsp;
        &nbsp;
        <h5 className='text-xl text-gray-900 font-mono'> <span className='text-2xl font-bold font-mono'>₹</span>{amount} </h5>
      </div>
    </div>
  );
};

export default Boxes;
