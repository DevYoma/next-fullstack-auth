"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { axios } from 'axios';
import './page.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState({
    email: "", 
    password: "", 
    username: ""
  })

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser({
      ...user,
      [name]: value
    })
  }

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user)
      console.log("Signup success" , response.data);
      router.push("/login")
    } catch (error: any) {
      // console.log("Something went wrong");
      console.log("Signup failed", error.response.data.error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='signUpPage'>
      <h3>Sign Up</h3>

      <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name='username'
            required
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name='email'
            required
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name='password'
            required
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button 
          disabled={user.email === "" || user.password === "" || user.username === ""}
          onClick={onSignup}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      <p>Already have an account? <Link href={'/login'}>Login</Link></p>
    </div>
  )
}

export default SignUpPage