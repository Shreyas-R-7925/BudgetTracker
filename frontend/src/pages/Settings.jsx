import React, {useState} from 'react' 
import { VerticalNavbar } from '../components'

const Settings = ({username, id}) => {
  console.log("in settings page",id); 

  const [input, setInput] = useState('');

  const handleSubmit = () => {

  } 

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log("Im",input,"here");
  }

  return (
    <div>
      <h1 className='ml-20 text-center text-2xl font-bold'>Settings</h1>
      <VerticalNavbar username={username} />  

      <div className='mt-16 ml-32 border rounded px-10 py-10 bg-blue-100'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            New Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={input.username}
            onChange={handleChange}
            className="shadow appearance-none border mb-3 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            New Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            New Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={input.password}
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
  )
}

export default Settings 