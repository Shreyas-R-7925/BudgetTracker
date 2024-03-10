import React, { useState, useEffect } from 'react';
import { Boxes, VerticalNavbar, Expenditure } from '../components';
import { food, bill, cash, shopping, leaf } from '../assets';
import axios from 'axios';

const Home = ({ username, email, id }) => {
  console.log('in home page username: ', username);
  console.log('in home page email: ', email);
  console.log('in home page id: ', id);

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await axios.get('http://localhost:8080/transactions');
        const categoriesResponse = await axios.get('http://localhost:8080/categories');

        // Filter transactions and categories based on userId
        const filteredTransactions = transactionsResponse.data.filter(transaction => transaction.userId === id);
        const filteredCategories = categoriesResponse.data.filter(category => category.userId === id);

        setTransactions(filteredTransactions);
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Depend on id to refetch data when id changes

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  return (
    <div className="flex">
      <VerticalNavbar username={username} />
      <div className="py-4 flex flex-col"> {/* Adjust the margin-left to accommodate navbar width */}
        <div className="ml-32 flex flex-wrap">
          <Boxes color="cyan" comment="BALANCE" image={cash} />
          <Boxes color="green" comment="RENT" image={bill} />
          <Boxes color="orange" comment="SHOPPING" image={shopping} />
          <Boxes color="black" comment="FOOD" image={food} />
          <Boxes color="brown" comment="OTHERS" image={leaf} />
        </div>
        <div className="mt-8 flex">
          <div className='ml-32'>
            <h2 className="text-xl font-bold">Recent Transactions</h2>
            <table>
              <thead>
                <tr>
                  <th className="text-black text-lg px-6 py-3">Purpose</th>
                  <th className="text-black text-lg px-6 py-3">Category</th>
                  <th className="text-black text-lg px-6 py-3">Amount</th>
                  <th className="text-black text-lg px-8 py-3">Date</th>
                  <th className="text-black text-lg px-8 py-3">Edit/Del</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => {
                  const category = categories.find((cat) => cat.id === transaction.categoryId);
                  return (
                    <tr key={transaction.id}>
                      <td className="text-black text-lg px-6 py-3">{transaction.description}</td>
                      <td className="text-black text-lg px-6 py-3">{category ? category.categoryName : 'Others'}</td>
                      <td className="text-black text-lg px-6 py-3">{transaction.amount}</td>
                      <td className="text-black py-3">{formatDate(transaction.date)}</td>
                      <td className='text-black py-3'>
                            {/* <Link to={`/update-faculty/${item.faculty_id}`}> */}
                            <button className="font-inter font-bold bg-green-300 text-black px-4 py-2 rounded-md">Edit</button>
                            &nbsp; 
                            {/* </Link>  */}
                            <button className="font-inter font-bold bg-red-500 text-black px-4 py-2 rounded-md" >Del</button> 
                        </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
          <div className='ml-10 justify-center items-center'>
          <Expenditure id={id}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
