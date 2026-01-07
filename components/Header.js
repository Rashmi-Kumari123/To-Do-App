'use client'
import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import styles from '@/components/Header.module.css'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'

const Header = () => {
  const { data: session } = useSession();
  const [authmode, setAuthmode] = useState("");

  const handleLogin = () => {
    setAuthmode("login");
  }
  const handleChange = () => {
    if(authmode==='login'){
      setAuthmode("signup");
    }else{
      setAuthmode("login");
    }
  }
  const closModal = () => {
    setAuthmode("");
  }
  return (

    <div >
      <nav className={styles.container}>
        <div >To-Do-List</div>
        <ul className={styles.list}>
          <li className={`${styles.li} ${styles.media}`}>About</li>
          <li className={`${styles.li} ${styles.media}`}>Contact us</li>
          {session ? (
            <li className={styles.li} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {session.user?.image && (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || 'User'} 
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
              )}
              <span>{session.user?.name || session.user?.email}</span>
              <button 
                onClick={() => signOut()} 
                className={styles.li}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
              >
                Logout
              </button>
            </li>
          ) : (
            <li onClick={handleLogin} className={styles.li}>Log in</li>
          )}
        </ul>
      </nav>
      {authmode && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <span><h2>{authmode==='signup'?'Sign Up':'Login'}</h2></span>
            <button className={styles.closeModal} onClick={closModal}>X</button>

          </div>
            {authmode==='signup'? <SignUp/>:<Login/>}
             <div className={styles.modalFooter}>
              <span>{authmode==='signup' ? 'Already have an account?' : 'Don\'t have an account?'} </span>
            <button className={styles.btn1} onClick={handleChange} >{authmode==='login' ? "SignUp":"Login"}</button>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header