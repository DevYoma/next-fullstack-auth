'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';


const VerifyEmailPage = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/user/verifyemail', {token});
            setVerified(true);
            return;
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    } 

    // fire onPage load
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);  
    }, [])

    // fire when token is updated 
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

  return (
    <div>
        <h1>Verify Email</h1>
        <h2>{token ? `${token}` : "No Token"}</h2>

        <hr /> <br />

        {
            verified && (
                <div>
                    <h2>Email Verified</h2>
                    <Link href={'/login'}>
                        Login
                    </Link>
                </div>
            )
        }

        
        {
            error && (
                <div>
                   <h2>Error</h2>

                </div>
            )
        } 

   
    </div>
  )
}

export default VerifyEmailPage