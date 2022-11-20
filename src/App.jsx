import React from 'react'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import UserContextProvider from './components/UserContextProvider'
import About from './routes/About'
import CreateNote from './routes/CreateNote'
import EditNote from './routes/EditNote'
import Layout from './routes/Layout'
import Login from './routes/Login'
import Notes from './routes/Notes'
import Register from './routes/Register'
import {loader as RegisterLoader} from './routes/Register'
import {loader as CreateNoteLoader} from './routes/CreateNote'
import Note, {loader as NoteLoader} from './routes/Note'
import NotFound from './routes/NotFound'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <NotFound />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: '/notes/:id',
        loader: NoteLoader,
        element: <Note />,
      },
      {
        path: '/notes/:id/edit',
        loader: NoteLoader,
        element: <EditNote />,
      },
      {
        path: '/notes/create',
        loader: CreateNoteLoader,
        element: <CreateNote />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    loader: RegisterLoader,
    element: <Register />,
  },
])

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}
