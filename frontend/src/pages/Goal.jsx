import React, { useState, useEffect } from 'react';
import { VerticalNavbar, Notifications } from '../components';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 

import { toast } from 'react-toastify'; 

const Goal = ({ username, id }) => {
    const [goalData, setGoalData] = useState({
        userId: id,
        targetAmount: '',
        date: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalData({ ...goalData, [name]: value });
    };

    useEffect(() => {
        setGoalData({
            userId: id,
            targetAmount: '',
            date: '',
            notes: ''
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8080/target`, goalData);
            toast.success("Target set successfully.");
            console.log("Target posted successfully");
            setGoalData({
                userId: id,
                targetAmount: '',
                date: '',
                notes: ''
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <VerticalNavbar username={username} />
            
            <div className='ml-24 mt-10'>

                <h1 className='mb-6 ml-16 text-2xl px-2 font-bold font-mono'>Set Target</h1>
                <form onSubmit={handleSubmit} className='bg-cyan-200 px-10 py-10 rounded full'>
                    <div className="mb-4">
                        <label htmlFor="targetAmount" className="block text-gray-700 font-bold mb-2">
                            Goal Amount
                        </label>
                        <input
                            type="number"
                            id="targetAmount"
                            name="targetAmount"
                            value={goalData.targetAmount}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter goal amount"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className='block text-lg text-gray-700 font-bold font-mono mb-2'>
                            Date
                        </label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={goalData.date}
                            onChange={handleChange}
                            placeholder='MM-YYYY'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-xl mb-2 text-gray-700 font-sans leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="notes" className="block text-gray-700 font-bold mb-2">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={goalData.notes}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter any additional notes (optional)"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Set Goal
                    </button>

                    &nbsp; 
                    &nbsp;
                    <Link
                        to="/targets"
                        type="submit"
                        className="bg-yellow-500 hover:bg-amber-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        View Targets
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Goal;