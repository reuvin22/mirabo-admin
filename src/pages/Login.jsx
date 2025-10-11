import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/home')
  }
  return (
    <>
        <div className='h-screen w-screen grid place-items-center'>
          <div className='border-2 h-96 w-96 rounded-sm'>
            <div className='grid place-items-center h-full'>
              <div className='grid place-items-center gap-3'>
              <div className='grid'>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" className='border-1 w-63 py-1 px-1' required/>
              </div>
              <div className='grid'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className='border-1 w-63 py-1 px-1' required/>
              </div>
              <button className='border-2 py-2 w-full rounded-sm bg-slate-600 text-white hover:bg-slate-400 cursor-pointer' onClick={handleLogin}>Login</button>
              <a href="forgot_password" className='text-blue-600 hover:text-blue-800'>Forgot Password?</a>
            </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login