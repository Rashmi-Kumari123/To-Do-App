'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import signUpStyle from '@/components/SignUp.module.css'

const Login = () => {
    const [data, setdata] = useState({
        username:"",
        password:"",
    })
    const handleChange = (e) =>{
        const {name,value} = e.target;
         setdata((prevData)=>{
             return {
                ...prevData,
                [name] : value
             }
         })
    }
  return (
    <div className={signUpStyle.container}>
        <form className={signUpStyle.form}>
            <label className={signUpStyle.label} htmlFor='username'>Username</label>
            <input name='username' placeholder='Enter your username' value={data.username} onChange={handleChange} id='username'  type="text"/>

            <label className={signUpStyle.label} htmlFor='password'>Password</label>
            <input name='password' placeholder='Enter your password' value={data.password} onChange={handleChange} id='password' type="password"/>
        </form>
        <button className={signUpStyle.btn}>Login</button>
        <button className={signUpStyle.btn1}>Forgot password ?</button>
        
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <div style={{ margin: '10px 0', color: '#666' }}>or</div>
          <button 
            className={signUpStyle.btn} 
            onClick={() => signIn('github')}
            style={{ backgroundColor: '#24292e', width: '100%' }}
          >
            Sign in with GitHub
          </button>
        </div>
    </div>
  )
}

export default Login