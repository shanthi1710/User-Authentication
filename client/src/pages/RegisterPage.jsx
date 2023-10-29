import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  async function registerUser(ev)
  {   ev.preventDefault();
      try{
        await axios.post('/register',{
          name,
          email,
          password,
        });
        alert('registration succeful. Now you can log in');
      } catch(e){
        alert('regitration failed Please try again later')
      }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="full name"
            value={name}
            onChange={(ev) => setName(ev.target.value)} // Fixed this line
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)} // Fixed this line
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)} // Fixed this line
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member{' '}
            <Link className="underline text-blue-500" to={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );  
}
