import React, {useEffect, useState} from 'react'
import {Link, useLoaderData, useNavigate} from 'react-router-dom'
import { useUserContext } from '../components/UserContextProvider'
import fetchData from '../functions/Fetch'

export const loader = async () => {
  const users = await fetchData('users')
  return users
}

export default function Register() {
  const navigate = useNavigate()
  const users = useLoaderData()
  const {user} = useUserContext()
  const initialValues = {email: '', password: '', passwordRep: ''}
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmited, setIsSubmited] = useState(false)
  useEffect(() => {
    if (user?.email) {
      navigate('/about')
    }
  })

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validate(formValues)
    setIsSubmited(true)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmited) {
      const user = {
        id: users.length + 1,
        email: formValues.email,
        password: formValues.password,
        createdAt: new Date().toISOString(),
      }
      fetchData('users',{}, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => navigate('/login'))
        .catch(() => console.log('bad luck'))
    } else {
      setIsSubmited(false)
    }
  }, [formErrors, isSubmited, formValues, navigate, users])

  const validate = (values) => {
    const {email, password, passwordRep} = values
    setFormErrors({
      ...validEmail(email),
      ...validPassword(password),
      ...validPasswordRep(password, passwordRep),
    })
  }

  const validEmail = (email) => {
    let error = {}
    let isAlreadyExist = !!users
      .map((user) => user.email === email)
      .filter((bool) => bool).length
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi
    if (!email) {
      error.email = 'Email is required'
    } else if (!email.match(regex)) {
      error.email = 'Email is has invalid format'
    } else if (isAlreadyExist) {
      error.email = 'Email is already exists'
    }
    return error
  }

  const validPassword = (password) => {
    let error = {}
    if (!password) {
      error.password = 'Password is required'
    } else if (password.length < 4) {
      error.password = 'Password must have more than 3 characters'
    }
    return error
  }

  const validPasswordRep = (password, passwordRep) => {
    let error = {}
    if (password !== passwordRep) {
      error.passwordRep = 'Passwords must be the same'
    }
    return error
  }

  return (
    <div className="bg-sky-400 w-screen h-screen flex flex-col justify-center py-20">
      <form className="form">
        <h1 className="text-3xl font-bold text-center mb-3">Sign Up</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Email"
              id="email"
              className="input"
              onChange={handleChange}
            />
          </div>
          <p className="invalid">{formErrors.email}</p>
          <div className="flex flex-col">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="input"
              onChange={handleChange}
            />
          </div>
          <p className="invalid">{formErrors.password}</p>
          <div className="flex flex-col">
            <label className="label" htmlFor="passwordRep">
              Repeat password
            </label>
            <input
              type="password"
              placeholder="Repeat password"
              id="passwordRep"
              className="input"
              onChange={handleChange}
            />
          </div>
          <p className="invalid">{formErrors.passwordRep}</p>
          <button className="btn" onClick={handleSubmit}>
            Sign Up
          </button>
          <Link to="/login" className="self-end text-blue-400 hover:underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  )
}
