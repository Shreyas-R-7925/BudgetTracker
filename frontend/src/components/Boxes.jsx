import React from 'react';

const Boxes = ({ color, comment, image }) => { 
 
  let boxStyle = {
    backgroundColor: color,
    width: '150px',
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
      height: '180px', // Adjust height as needed
      fontSize: '24px', // Adjust font size as needed
      textAlign: 'center',
      marginTop: '20px' // Center align text
      // Add any other special properties for blue color
    };
  }

  return (
    <div className="rounded-lg" style={boxStyle}>
      {comment}
      <img src={image} className='w-10 h-10'></img>
    </div>
  );
};

export default Boxes;
