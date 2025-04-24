import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router";

function Signup() {
    const formRef = useRef(null);
    const [warning, setWarning] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        if (token) {
            async function checkAuth(token) {
                const response = await axios.get(`${BACKEND_URL}/user/checkauth`, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  })
                if (response.data.msg == "authorized") {
                    navigate("/admin")
                }
                console.log(response)
            }
            checkAuth(token)
        }
    }, [])


    async function handleSubmit(e) {
        e.preventDefault();
        const name = formRef.current.name.value
        const email = formRef.current.email.value
        const password = formRef.current.password.value
        const response = await axios.post("http://localhost:8000/user/signin", { email, password,name })

        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
            navigate("/admin");
        } else {
            setWarning(response.data.msg)
        }

    }

    return (
        <div className='h-[100vh] w-full flex flex-col items-center justify-center bg-gray-200'>
            <h1 className='font-bold text-2xl my-3'>Signup</h1>
            <form className='flex flex-col bg-white rounded-2xl p-5 gap-5 shadow-lg w-[30%] min-w-[300px]' ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Name</label>
                    <input className='p-1.5 bg-gray-200 rounded-sm' type="text" id="name" name='name' placeholder='Enter your name' required />
                </div>
                <div className='flex flex-col gap-1 '>
                    <label htmlFor="email">Email</label>
                    <input className='p-1.5 bg-gray-200 rounded-sm' type="email" id="email" name='email' placeholder='Enter your email' required />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password">Password</label>
                    <input className='p-1.5 bg-gray-200 rounded-sm' type="password" id="password" name='password' placeholder='Enter your password' required />
                </div>
                {warning && <p className='text-center text-red-400'>{warning}</p>}
                <button className='bg-green-600 text-white py-2.5 rounded-sm' type='submit'>Singup</button>
            </form>
        </div>
    )
}

export default Signup
