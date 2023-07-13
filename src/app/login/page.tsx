'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './page.css'
import { useRouter } from 'next/navigation'
import axios from "axios"

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "", 
    password: "", 
  })

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser({
      ...user,
      [name]: value
    })
  }

  const onLogin = async () => { 
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", user);
      console.log("Login successful", response.data);
      // configure the toast
      router.push("/profile")
    } catch (error: any) {
      console.log("Login failed", error.message);
    }finally{
      setLoading(false)
    }
  }
  
  return (
    <div className='loginPage'>
    <h3>Login</h3>

      <div>
        <label htmlFor="email">Email</label>
        <input 
          required
          type="email" 
          name='email'
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

      <button disabled={user.email === "" || user.password === ""} onClick={onLogin}>{loading ? "Loading" : "Login"}</button>
    <p>Don't have an account? <Link href={'/signup'}>Sign Up</Link></p>
  </div>
  )
}

export default LoginPage