'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import style from '@/components/SignUp.module.css'

const SignUp = () => {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const { fullname, email, password, confirmPassword } = data;
    if (fullname.trim() && email.trim() && password.trim() && confirmPassword.trim()) {
      if (password === confirmPassword) {
        console.log(data);
      } else {
        alert('Password does not match');
      }
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <label className={style.label} htmlFor='fullName'>Name</label>
        <input name="fullname" onChange={handleChange} value={data.fullname} id='fullName' type="text" placeholder='Enter your name' />

        <label className={style.label} htmlFor='email'>Email</label>
        <input name="email" onChange={handleChange} value={data.email} id='email' type="text" placeholder='Enter your email' />

        <label className={style.label} htmlFor='password'>Password</label>
        <input name="password" onChange={handleChange} value={data.password} id='password' type="text" placeholder='Enter your password' />

        <label className={style.label} htmlFor='confirmPassword'>Confirm Password</label>
        <input name="confirmPassword" onChange={handleChange} value={data.confirmPassword} id='confirmPassword' type="text" placeholder='Confirm your password' />
      </form>

      <button className={style.btn} onClick={handleSubmit}>Sign Up</button>
      
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <div style={{ margin: '10px 0', color: '#666' }}>or</div>
        <button 
          className={style.btn} 
          onClick={() => signIn('github')}
          style={{ backgroundColor: '#24292e', width: '100%' }}
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignUp;
