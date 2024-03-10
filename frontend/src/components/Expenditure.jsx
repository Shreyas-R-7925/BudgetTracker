import React, { useState } from 'react';
import axios from 'axios';

const Expenditure = ({ id }) => {
    console.log("user id in expenditure",id);
  const [formData, setFormData] = useState({
    userId: id,
    categoryId: '',
    amount: '',
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  let formattedDate = value; // Default value

//   if (name === 'date') {
//     // Split the input date string by '-'
//     const parts = value.split('-');
    
//     // Construct the date string in the format 'yyyy-mm-dd'
//     if (parts.length === 3) {
//       formattedDate = `${parts[1]}-${parts[2]}`;
//     }
//   }

  setFormData({ ...formData, [name]: formattedDate });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/transactions', formData);
      console.log('Transaction added successfully');
      // Reset form data after successful submission
      setFormData({
        userId: id,
        categoryId: '',
        amount: '',
        description: '',
        date: ''
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Expenditure</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="purpose" className="block text-gray-700 font-bold mb-2">
          Purpose
        </label>
        <input
          type="text"
          id="purpose"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
          Category
        </label>
        <select
          id="category"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills/Utilities</option>
          <option value="others">Others</option>
        </select>

        <label htmlFor="date" className='block text-gray-700 font-bold mb-2'>
          Date
        </label>
        <input
  type="text"
  id="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
/>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Expenditure;
