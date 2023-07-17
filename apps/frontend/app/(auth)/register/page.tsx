'use client'
import Link from 'next/link';
import { useState } from 'react';

/* eslint-disable-next-line */
// export interface RegisterProps {}

export default function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleNameChange = (e: any) => {
        setUserName(e.target.value);
    };
  
    const handleEmailChange = (e: any) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e: any) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const user = {
        userName,
        email,
        password
      };
      
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
      };
  
    return (
        <div className='pt-12 border-solid border-black'>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          
          {/* <p className='font-bold py-2 px-4 '>
          <br/>
          <br/>
          If you already have an account <Link href="/login">Login
              </Link></p> */}
        </div>
      </form>
      </div>
    );
  };