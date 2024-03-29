import React, { useState, useEffect } from 'react';
import { VerticalNavbar } from '../components';
import axios from 'axios';

import { toast } from 'react-toastify';

const Settings = ({ username, id }) => {
  // console.log("in settings page", id);

  const [input, setInput] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [apiPassword, setApiPassword] = useState('');

  useEffect(() => {
    // Fetch user's password from API when component mounts
    axios.get(`http://localhost:8080/user/${id}`)
      .then(response => {
        console.log("Password response:", response.data);
        console.log(typeof response.data); 
        // setApiPassword(response.data);
        setApiPassword(response.data.toString());

      })
      .catch(error => {
        console.error('Error fetching password:', error);
        toast.error("Error fetching password"); 
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("current password", input.currentPassword); 
    console.log("new password", input.newPassword);
    console.log("apiPassword", apiPassword);
    // Check if current password matches the one fetched from the API
    if (input.currentPassword !== apiPassword) {
      toast.error("Current password is incorrect");
      return;
    } 

    if(input.newPassword === "" || input.confirmPassword === ""){
      toast.error("Enter new password");
      return;
    }
  
    // Check if new password and confirm password match
    if (input.newPassword !== input.confirmPassword) {
      setError('New password and confirm password do not match');
      toast.error("New password doesn't match confirm password");
      return;
    }
  
    // If all checks pass, update the password
    axios.put(`http://localhost:8080/user/${id}/change-password`, { newPassword: input.newPassword })
      .then(response => {
        console.log('Password changed successfully:', response.data);
        toast.success("Updated Password successfully");
        // Clear input fields
        setInput({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      })
      .catch(error => {
        console.error('Error changing password:', error);
      });
  };
  

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1 className='ml-20 text-center mt-4 ml-24 text-2xl font-bold font-mono'>Settings</h1>
      <VerticalNavbar username={username} />

      <h4 className='text-center mt-8 ml-24 text-2xl font-mono'>Change Password</h4>
      <div className='mt-0 ml-32 border rounded px-10 py-10 bg-sky-100'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="currentPassword" className="block text-gray-700 font-bold mb-2">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={input.currentPassword}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={input.newPassword}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 w-22 h-10 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
