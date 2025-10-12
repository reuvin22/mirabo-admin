import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard')
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

          <form className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-600 mb-1 text-sm sm:text-base">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 mb-1 text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
            >
              Login
            </button>

            <div className="text-center">
              <a
                href="forgot_password"
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login