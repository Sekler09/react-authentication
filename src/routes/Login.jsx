import React, {useCallback, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useUserContext} from '../components/UserContextProvider'
import fetchData from '../functions/Fetch'

export default function Login() {
  const userContext = useUserContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSetEmail = useCallback((e) => setEmail(e.target.value), [])

  const handleSetPassword = useCallback((e) => setPassword(e.target.value), [])

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault()
      fetchData('users', {email, password}).then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0])
        } else {
          setError('Incorect user data')
        }
      })
    },
    [email, password, userContext]
  )

  useEffect(() => {
    if (userContext.user?.email) {
      navigate('/about')
    }
  })
  return (
    <div className='bg-sky-400 w-screen h-screen flex flex-col justify-center py-20 '>
      <form className='form'>
        <h1 className='text-3xl font-bold text-center mb-3'>Sign in</h1>
        <div className='flex flex-col gap-5'>
          <input
            className='input'
            placeholder='email'
            value={email}
            onChange={handleSetEmail}
          />
          <input
            placeholder='password'
            value={password}
            className='input'
            onChange={handleSetPassword}
            type='password'
          />
          <p className='text-red-500'>{error}</p>
          <button onClick={handleLogin} className='btn'>
            Login
          </button>
          <Link
            to='/register'
            className='self-end text-blue-600 font-bold hover:underline'
          >
            No account? Register!
          </Link>
        </div>
      </form>
    </div>
  )
}
