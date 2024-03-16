import React, { useState, useEffect } from 'react';
import { VerticalNavbar, Boxes } from '../components';
import { food, bill, cash, shopping, leaf, entertainment, doctor } from '../assets';

const Report = ({ username, id }) => {
  console.log("in report page", id);

  const [input, setInput] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data.filter(transaction => transaction.userId === id)))
      .catch(error => console.error('Error fetching transactions:', error));
  }, [id]);

  const handleChange = (event) => {
    setInput(event.target.value);
    const totalExpenses = calculateTotalExpenses(event.target.value);
  }; 


  const sortCategoriesByExpense = (monthYear) => {
    const [month, year] = monthYear.split('-').map(Number);
    const categoryExpenses = [];
    for (const category of ['food', 'health', 'shopping', 'bills', 'entertainment', 'others']) {
      const totalExpense = calculateTotalExpenses(monthYear, category);
      categoryExpenses.push({ category, totalExpense });
    }
    // Sort categories by expense in descending order
    categoryExpenses.sort((a, b) => b.totalExpense - a.totalExpense);
    return categoryExpenses;
  };

  // Function to assign colors based on expense rank
  const assignColor = (index) => {
    // Define color scheme
    const colors = ['#dc2626', '#f97316', '#fbbf24', '#bef264', '#22c55e', '#15803d'];
    // Ensure index is within color array bounds
    const colorIndex = Math.min(index, colors.length - 1);
    return colors[colorIndex];
  };

  const getImageForCategory = (category) => {
    if(category === 'food'){
      return food;
    }
    else if(category === "bills"){
      return bill;
    } 
    else if(category === "health"){
      return doctor; 
    } 
    else if(category === "entertainment"){
      return entertainment;
    }
    else if(category === "shopping"){
      return shopping;
    }
    else if(category === "others"){
      return leaf;
    }
  }
  
  // Function to calculate total expenses for each category
  const calculateTotalExpenses = (monthYear, category) => {
    const [month, year] = monthYear.split('-').map(Number); 
    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() + 1 === month &&
          transactionDate.getFullYear() === year &&
          transaction.categoryId === category
        );
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  }; 

  const grandTotal = (monthYear) => {
    const [month, year] = monthYear.split('-').map(Number); 
    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() + 1 === month && transactionDate.getFullYear() === year;
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  return (
    <div className='flex flex-col'>
      <h1 className='ml-20 text-center text-2xl font-bold'>Report</h1>
      <VerticalNavbar username={username} />

      <div className="ml-40 mt-14 flex flex-wrap">
        {sortCategoriesByExpense(input).map((category, index) => (
          <Boxes
            key={category.category}
            color={assignColor(index)}
            comment={category.category.toUpperCase()}
            image={getImageForCategory(category.category)}
            amount={category.totalExpense}
          />
        ))}
      </div>

      <div className="ml-40 mt-14 flex flex-wrap">
        <Boxes color="cyan" comment={`Total expenses for ${input}`} image={cash} amount={grandTotal(input)} />
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
