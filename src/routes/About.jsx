import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../components/UserContextProvider'

export default function About() {
  const {user} = useUserContext()
  const signDate = new Date(user.createdAt).toLocaleString().replace('\,', '')
  return (
    <div className='form w-full flex flex-col items-center gap-12'>
      <h1 className='text-4xl font-bold text-center'>About me</h1>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-bold'>Email: <span className='text-slate-400 font-semibold'>{user.email}</span></div>
        <div className='text-xl font-bold'>Date sign up: <span className='text-slate-400 font-semibold'>{signDate}</span></div>
      </div>
      <Link to='/notes' className='btn'>Go to notes</Link>
    </div>
  )
}
