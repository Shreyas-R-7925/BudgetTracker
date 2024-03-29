import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { toast } from 'react-toastify'; 

const Notifications = ({username, id}) => {

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

    if(expenses == 0){
      return <h1>&nbsp; &nbsp; &nbsp; &nbsp;-----------------&nbsp; &nbsp; &nbsp; &nbsp;</h1>
    }
    else if(expenses > tarAmt){
      return <h1>Expenses out of control.</h1>
    }
    else{
      return <h1>Goal achievable.</h1>
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

  const delTarget = async (targetId) => {
    try {
      await axios.delete(`http://localhost:8080/target/${targetId}`);
      setTargetData(prevTargets => prevTargets.filter(target => target.id !== targetId));
      toast.success("Target deleted successfully!");
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  
  
  return (
    <div>
      <h2 className='align-items text-center justify-between font-bold font-mono text-2xl ml-10 mb-6'>Targets</h2>
      <table>
        <thead>
          <tr>
            <th className='px-12'>Goal</th>
            <th className='px-12'>Expenses</th>
            <th className='px-12'>Date</th>
            <th className='px-12'>Message</th>
          </tr>
        </thead>
        <tbody>
          {targetData && targetData.map((target, index) => (
            <tr key={target._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-zinc-400'}>
              <td className='px-6 py-3'>{target.targetAmount}</td>
              <td className='px-6 py-3'>{grandTotal(target.date)}</td>
              <td className='px-6 py-3'>{formatDate(target.date)}</td>
              <td className='px-6 py-3'>{goalAchieved(target.targetAmount, grandTotal(target.date))}</td>
              <td className='px-6 py-3'>
                <button onClick={() => delTarget(target.id)} className="font-inter font-bold bg-red-500 text-black px-4 py-2 rounded-md" >Del</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
