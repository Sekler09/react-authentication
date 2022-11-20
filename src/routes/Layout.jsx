import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import {useUserContext} from '../components/UserContextProvider'

export default function Layout() {
  const {user, setUser} = useUserContext()
  const handleLogout = () => {
    setUser({email: ''})
  }
  return (
    <div className=''>
      <div className='w-4/5 mx-auto flex flex-col gap-5 pt-10'>
        <header className='bg-white flex justify-between p-10 rounded-xl shadow-md'>
          <div className='text-xl font-semibold'>
            Hello, {user.email.replace(/@([\w-]+\.)+[\w-]{2,4}$/gi, '')}
          </div>

          <div className='flex gap-5'>
            <NavLink
              to='/about'
              className={({isActive}) =>
                'text-2xl font-semibold ' +
                (isActive
                  ? ' text-black pointer-events-none'
                  : ' text-slate-400 ')
              }
            >
              About
            </NavLink>
            <NavLink
              to='/notes'
              end={true}
              className={({isActive}) =>
                'text-2xl font-semibold ' +
                (isActive
                  ? ' text-black pointer-events-none'
                  : ' text-slate-400 ')
              }
            >
              Notes
            </NavLink>
            <button
              onClick={handleLogout}
              className='text-2xl font-semibold text-slate-400'
            >
              Log out
            </button>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
