import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { VerticalNavbar, Boxes } from '../components';
import { food, bill, cash, shopping, leaf, entertainment, doctor } from '../assets';

const Report = ({ username, id }) => {
  console.log("in report page", id);

  const [input, setInput] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false); // State to control whether to show transactions or not

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await axios.get('http://localhost:8080/transactions');
        const categoriesResponse = await axios.get('http://localhost:8080/categories');

        // Filter transactions based on userId
        const filteredTransactions = transactionsResponse.data.filter(transaction => transaction.userId === id);
        setTransactions(filteredTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Depend on id to refetch data when id changes

  const handleChange = (event) => {
    setInput(event.target.value);
    setShowTransactions(true);
  };

  const formatDate = (date) => {
    const options = { month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const filterTransactionsByMonthYear = (monthYear) => {
    const [month, year] = monthYear.split('-').map(Number);
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() + 1 === month && transactionDate.getFullYear() === year;
    });
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

  const assignColor = (index) => {
    const colors = ['#dc2626', '#f97316', '#fbbf24', '#bef264', '#22c55e', '#15803d'];
    const colorIndex = Math.min(index, colors.length - 1);
    return colors[colorIndex];
  };

  const getImageForCategory = (category) => {
    if(category === 'food'){
      return food;
    } else if(category === "bills"){
      return bill;
    } else if(category === "health"){
      return doctor; 
    } else if(category === "entertainment"){
      return entertainment;
    } else if(category === "shopping"){
      return shopping;
    } else if(category === "others"){
      return leaf;
    }
  }
  
  const calculateTotalExpenses = (monthYear, category) => {
    const filteredTransactions = filterTransactionsByMonthYear(monthYear);
    return filteredTransactions
      .filter(transaction => transaction.categoryId === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }; 

  const grandTotal = (monthYear) => {
    const filteredTransactions = filterTransactionsByMonthYear(monthYear);
    return filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  return (
    <div className='flex flex-col'>
      <h1 className='ml-20 text-center text-2xl font-bold font-mono'>Analysis</h1>
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
      <div className="flex items-center"> {/* Wrap them in a flex container */}
    <Boxes color="cyan" comment={`Total expenses for ${input}`} image={cash} amount={grandTotal(input)} />
    <input
      type="text"
      id="search"
      name="search"
      value={input}
      placeholder='Search by mm-yyyy'
      onChange={handleChange}
      className="shadow appearance-none border rounded-none ml-4 h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 h-10 ml-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Go 
    </button>
  </div>

        {showTransactions && (
          <div className="mt-8 flex">
            <div className='ml-64'>
              <h2 className="text-xl font-bold font-mono">Transactions in {input}</h2>
              <table>
                <thead>
                  <tr>
                    <th className="text-black text-lg px-6 py-3">Purpose</th>
                    <th className="text-black text-lg px-6 py-3">Category</th>
                    <th className="text-black text-lg px-6 py-3">Amount</th>
                    <th className="text-black text-lg px-8 py-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filterTransactionsByMonthYear(input).map((transaction, index) => (
                    <tr key={transaction.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-zinc-400'}>
                      <td className="text-black text-lg px-6 py-3">{transaction.description}</td>
                      <td className="text-black text-lg px-6 py-3">{transaction.categoryId}</td>
                      <td className="text-black text-lg px-6 py-3">{transaction.amount}</td>
                      <td className="text-black py-3">{formatDate(transaction.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
