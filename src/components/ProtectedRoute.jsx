import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from './UserContextProvider'

export default function ProtectedRoute({children}) {
  const {user : {email}} = useUserContext()
  if(!email){
    return <Navigate to= '/login'/>
  }
  return children
}
