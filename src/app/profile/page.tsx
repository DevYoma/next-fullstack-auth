"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [data, setData] = useState("nothing")
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/user/logout')
      alert("Logout Successful")
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);

      // show toast
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/user/me');
    console.log(res.data);

    setData(res.data.data._id);
  }
  return (
    <div>
      <h3>Profile Page</h3>
      <hr /> 
      
      <br />

      <button onClick={getUserDetails}>Get User Details</button>
      <h2>{data === "nothing" ? "No Data" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      
      <br />

      <button 
        onClick={logout}
        style={{
          padding: "10px 1rem",
          marginTop: "1rem",
        }}>
          Logout
        </button>
    </div>
  )
}

export default ProfilePage