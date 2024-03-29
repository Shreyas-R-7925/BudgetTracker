import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Report, Settings, Goal, Targets } from './pages';
import { Login, Notifications } from './components'; 
import { budget } from './assets';
import {ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'; 

import axios from 'axios';

const App = () => {
  const [id, setId] = useState(localStorage.getItem('userId') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  const [authenticated, setAuthenticated] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('userId', id);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
    }
  }, [authenticated, id, username, email]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const signup = () => {
    setSigningUp(true);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user", {
        username: username,
        email: email,
        password: password
      });
      if (response.status === 201) { 
        toast.success("Signed up successfully!");
        console.log("Sign-up successful");
        const usersResponse = await axios.get("http://localhost:8080/user");
      const users = usersResponse.data;

      // Find the newly signed up user
      const newUser = users.find(user => user.username === username && user.email === email);

      if (newUser) {
        console.log("in app.jsx my newuser id is ",newUser.id);
        setId(newUser.id);
        setEmail(newUser.email);
        setUsername(newUser.username);
        setAuthenticated(true);
      }
      }
    } catch (error) {
      toast.error("Fill out all fields.");
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/user");
      const users = response.data;

      // Find user by username
      const user = users.find(user => user.username === username);

      if (!user) {
        setError('User not found');
        console.log('User not found');
        return;
      }

      if (user.password === password) {
        // Authentication successful
        console.log('Authentication successful');
        toast.success("Welcome!");
        setId(user.id)
        setEmail(user.email)
        console.log('User email:', user.email); // Log user's email
        console.log('User id:', user.id);
        setAuthenticated(true);
      } else {
        setError('Invalid password');
        toast.error("Invalid password");
        console.log("Invalid password");
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Error fetching user data");
      setError('Error fetching user data');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword('');
    setUsername(''); 
    setEmail('');
    setId('');
    toast.success("Logged out successfully");
  };

  return (
    <BrowserRouter>
      <div>
        {!authenticated && (
          <div className='flex flex-col items-center justify-center'>
            <img src={budget} alt="Your Image" className="w-52 h-48 mt-10 rounded-full" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          {!authenticated && !signingUp && (
            <Login
              handleLogin={handleLogin}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              signup={signup}
            />
          )}
          {!authenticated && signingUp && (
            <div className="max-w-md w-full">
              <h2 className="text-3xl font-bold mb-4 font-mono">Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="username"
                    id="username"
                    name="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handlePasswordChange}
                  />
                </div>
              
                <button
                  type="submit"
                  className="bg-amber-500 font-mono hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
          <ToastContainer position="bottom-right" />
          {authenticated && (
            <div>
              <button className="absolute top-1 right-1 h-16 w-16 rounded-full bg-red-400 hover:bg-red-100 font-bold text-sm" onClick={handleLogout}>Logout</button>
              <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]">
                <Routes>
                  <Route path="/" element={<Home username={username} email={email} id={id} />} />
                  <Route path="/report" element={<Report username={username} id={id} />} />
                  <Route path="/goal" element={<Goal username={username} id={id} />} />
                  <Route path="/settings" element={<Settings username={username} id={id} />} />
                  <Route path="/targets" element={<Targets username={username} id={id} />} />
                </Routes>
              </main>
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
