import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expenditure = ({ id, editingTransaction }) => {
  const [formData, setFormData] = useState({
    userId: id,
    categoryId: '',
    amount: '',
    description: '',
    date: ''
  });

  console.log("in expenditure component ", id);
  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        userId: id,
        categoryId: editingTransaction.categoryId,
        amount: editingTransaction.amount,
        description: editingTransaction.description,
        date: editingTransaction.date
      });
    } else {
      // Reset form data when editingTransaction is null (no transaction selected)
      setFormData({
        userId: id,
        categoryId: '',
        amount: '',
        description: '',
        date: ''
      });
    }
  }, [editingTransaction, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        // If editingTransaction exists, update the transaction
        await axios.put(`http://localhost:8080/transactions/${editingTransaction.id}`, formData);
        console.log('Transaction updated successfully');
      } else {
        // Otherwise, add a new transaction
        await axios.post('http://localhost:8080/transactions', formData);
        console.log('Transaction added successfully');
      }
      // Reset form data after successful submission
      setFormData({
        userId: id,
        categoryId: '',
        amount: '',
        description: '',
        date: ''
      });
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-mono font-bold mb-4">Expenditure</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="purpose" className="block text-lg text-gray-700 font-bold font-mono mb-2">
          Purpose
        </label>
        <input
          type="text"
          id="purpose"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-xl mb-2 text-gray-700 font-sans leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="amount" className="block text-lg text-gray-700 font-bold font-mono mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-xl mb-2 text-gray-700 font-sans leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="category" className="block text-lg text-gray-700 font-bold font-mono mb-2">
          Category
        </label>
        <select
          id="category"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-xl mb-2 text-gray-700 font-sans leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills</option>
          <option value="health">Health</option> 
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>

        <label htmlFor="date" className='block text-lg text-gray-700 font-bold font-mono mb-2'>
          Date
        </label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-xl mb-2 text-gray-700 font-sans leading-tight focus:outline-none focus:shadow-outline"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingTransaction ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default Expenditure;
