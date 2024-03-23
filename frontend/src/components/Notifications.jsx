import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Notifications = ({id}) => {

  const [transactions, setTransactions] = useState([]); 

  const [targetData, setTargetData] = useState('');  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await axios.get('http://localhost:8080/transactions');

        const filteredTransactions = transactionsResponse.data.filter(transaction => transaction.userId === id);
        setTransactions(filteredTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (date) => {
    const options = { month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateTotalExpenses = (monthYear, category) => {
    const filteredTransactions = filterTransactionsByMonthYear(monthYear);
    return filteredTransactions
      .filter(transaction => transaction.categoryId === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }; 

  const filterTransactionsByMonthYear = (targetDate) => {
    const targetDateObject = new Date(targetDate);
    const month = targetDateObject.getMonth() + 1;
    const year = targetDateObject.getFullYear();
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() + 1 === month && transactionDate.getFullYear() === year;
    });
  };
  
  const grandTotal = (targetDate) => {
    const filteredTransactions = filterTransactionsByMonthYear(targetDate);
    return filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  }; 

  const goalAchieved = (tarAmt, expenses) =>{ 
    console.log("this is taramt",tarAmt);
    console.log("this is expensee ", expenses);
    if(tarAmt <= expenses){
      return <h1>Good</h1>
    }
    else{
      return <h1>Not achieved the target</h1>
    }
  } 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8080/target/${id}`);
        const target = response.data;
        setTargetData(target);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); 
  
  return (
    <div className="notification">
      <h2>Targets</h2>
      <table>
        <thead>
          <tr>
            <th>Target Amount</th>
            <th>Expenses</th>
            <th>Date</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {targetData && targetData.map((target) => (
            <tr key={target._id}>
              <td>{target.targetAmount}</td>
              <td>{grandTotal(target.date)}</td>
              <td>{formatDate(target.date)}</td>
              <td>{goalAchieved(target.targetAmount, grandTotal(target.date))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
