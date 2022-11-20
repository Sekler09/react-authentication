import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='form w-full text-xl text-red-500 font-semibold'>
      This note does not exist! Go to{' '}
      <Link className='underline text-lg' to={'/about'}>
        About
      </Link>
    </div>
  )
}
