import React, { useState, useEffect } from 'react';
import { Boxes, VerticalNavbar, Expenditure } from '../components';
import { food, bill, shopping, leaf, entertainment, doctor } from '../assets';
import axios from 'axios';

import { toast } from 'react-toastify';

const Home = ({ username, email, id }) => {
  console.log('in home page username: ', username);
  console.log('in home page email: ', email);
  console.log('in home page id: ', id);

  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          const response = await axios.get("http://localhost:8080/user");
          const users = response.data;
          const user = users.find(user => user.username === username);
          const id = user.id;
          setUserId(id);
        }

        const transactionsResponse = await axios.get('http://localhost:8080/transactions');
        const categoriesResponse = await axios.get('http://localhost:8080/categories');

        // Filter transactions and categories based on userId
        const filteredTransactions = transactionsResponse.data.filter(transaction => transaction.userId === id);
        const filteredCategories = categoriesResponse.data.filter(category => category.userId === id);
        setTransactions(filteredTransactions);
        setCategories(filteredCategories);
      } catch (error) {
        toast.error("Error fetching data. Try again later.")
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Depend on id to refetch data when id changes

  const calculateTotalExpenses = (category) => {
    return transactions
      .filter(transaction => transaction.categoryId === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }; 

  const delTransaction = async (transactionId) => {
    try {
      await axios.delete(`http://localhost:8080/transactions/${transactionId}`);
      setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
      toast.success("Transaction deleted successfully"); 
    } catch (error) {
      toast.error("Error deleting transaction.");
      console.error('Error deleting transaction:', error);
    }
  };  

  const editTransaction = (transactionId) => {
    // Find the transaction being edited
    const transactionToEdit = transactions.find(transaction => transaction.id === transactionId);
    // Set the editingTransaction state to the found transaction
    setEditingTransaction(transactionToEdit);
  }

  return (
    <div className="flex">
      <VerticalNavbar username={username} />
      <div className="py-4 flex flex-col"> 
      <h1 className='ml-36 mb-4 font-bold font-mono text-2xl'>Transactions Overview</h1>
        <div className="ml-36 flex flex-wrap">
          {/* <Boxes color="cyan" comment="Expenses" image={cash} /> */}
          <Boxes color="#29b6f6" comment="Food" amount={calculateTotalExpenses("food")} image={food} />
          <Boxes color="#67e8f9" comment="Health" amount = {calculateTotalExpenses("health")} image={doctor} />
          <Boxes color="#29b6f6" comment="Shopping" amount ={calculateTotalExpenses("shopping")} image={shopping} />
          <Boxes color="#67e8f9" comment="Bills" amount={calculateTotalExpenses("bills")} image={bill} />
          <Boxes color="#29b6f6" comment="Entertainment" amount={calculateTotalExpenses("entertainment")} image={entertainment} />
          <Boxes color="#67e8f9" comment="Others" amount={calculateTotalExpenses("others")} image={leaf} />
        </div>
        <div className="mt-8 flex">
          <div className='ml-36'>
            <h2 className="text-2xl font-bold font-mono">Recent Transactions</h2>
            <table>
              <thead>
                <tr>
                  <th className="text-black text-base px-6 py-3">Purpose</th>
                  <th className="text-black text-base px-6 py-3">Category</th>
                  <th className="text-black text-base px-6 py-3">Amount</th>
                  <th className="text-black text-base px-8 py-3">Date</th>
                  <th className="text-black text-base px-8 py-3">Edit/Del</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction, index) => {
                  return (
                    <tr key={transaction.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-zinc-400'}>
                      <td className="text-black font-serif text-lg px-6 py-3">{transaction.description}</td>
                      <td className="text-black font-serif text-lg px-6 py-3">{transaction.categoryId}</td>
                      <td className="text-black font-mono text-lg px-6 py-3">{transaction.amount}</td>
                      <td className="text-black text-base font-mono py-3">{formatDate(transaction.date)}</td>
                      <td className='text-black font-mono px-2 py-3'>
                            {/* <Link to={`/update-faculty/${item.faculty_id}`}> */}
                            <button onClick={() => editTransaction(transaction.id)} className="font-inter font-bold bg-cyan-200 text-black px-4 py-2 rounded-md">Edit</button>
                            &nbsp; 
                            {/* </Link>  */}
                            <button onClick={() => delTransaction(transaction.id)} className="font-inter font-bold bg-red-500 text-black px-4 py-2 rounded-md" >Del</button> 
                        </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
          <div className='ml-10 justify-center items-center'>
            <Expenditure id={id} editingTransaction={editingTransaction} />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;    