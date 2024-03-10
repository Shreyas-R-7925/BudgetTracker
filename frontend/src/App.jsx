import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, Report, Settings} from './pages';
import { budget } from './assets';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem('authenticated', 'true');
    } else {
      localStorage.removeItem('authenticated');
    }
  }, [authenticated]);

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

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would perform actual authentication, for simplicity let's use a hardcoded check
    if (username === 's123' && password === '12345') {
      setAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {!authenticated && (
          <div className="w-1/2 bg-gray-200">
            <img src={budget} alt="Your Image" className="object-cover h-full w-full" />
          </div>
        )}
        <div className="w-1/2 flex flex-col items-center justify-center">
          {!authenticated && !signingUp && (
            <div className="max-w-md w-full">
              <h2 className="text-3xl font-bold mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleUsernameChange}
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Log In
                </button>

                <button
                  onClick={signup}
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
          {!authenticated && signingUp && (
            <div className="max-w-md w-full">
              <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
              <form onSubmit={handleLogin}>
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
          {authenticated && (
            <div>
              <button className="absolute top-0 right-0 h-16 w-16 bg-yellow-200" onClick={handleLogout}>Logout</button>
              <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/settings" element={<Settings />} />
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
