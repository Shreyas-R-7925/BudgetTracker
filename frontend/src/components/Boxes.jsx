import React from 'react';

const Boxes = ({ color, comment }) => {
  const boxStyle = {
    backgroundColor: color,
    width: '100px',
    height: '100px',
    display: 'inline-block', // Display boxes inline
    marginRight: '10px', // Add margin between boxes
    color: 'white'
  };

  return (
    <div style={boxStyle}>
      {comment}
    </div>
  );
};

export default Boxes;
