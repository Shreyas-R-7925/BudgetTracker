import React, { useState, useEffect } from 'react';
import { VerticalNavbar, Notifications } from '../components';
import axios from 'axios';

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
            console.log("Goal posted successfully");
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
            <h1 className='ml-20 text-center text-2xl font-bold font-mono'>Set Target</h1>
            <form onSubmit={handleSubmit}>
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
                        placeholder='DD-MM-YYYY'
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
            </form>
            <Notifications id={id}/>
        </div>
    );
}

export default Goal;
