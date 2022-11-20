import React, {Suspense} from 'react'
import {Await, Link, useLoaderData, useNavigate} from 'react-router-dom'
import {useUserContext} from '../components/UserContextProvider'
import editIcon from '../assets/icons/edit.png'
import deleteIcon from '../assets/icons/bin.png'
import NotFound from './NotFound'
import fetchData from '../functions/Fetch'

export const loader = ({params: {id}}) => {
  return id
}

export default function Note() {
  const navigate = useNavigate()
  const noteId = useLoaderData()
  const {user} = useUserContext()

  const note = fetchData('notes', {userId: user.id, id: noteId}).then(
    (data) => {
      if (!data.length) {
        throw new Error('mistaken')
      } else {
        return data
      }
    }
  )

  const handleDeleteNote = (noteId) => {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm('Are u sure?')
    if (conf) {
      fetchData(
        `notes/${noteId}`,
        {userId: user.id},
        {
          method: 'DELETE',
        }
      )
      navigate('/notes')
    }
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={note} errorElement={<NotFound />}>
          {(note) => (
            <div className='form flex flex-col gap-4 w-full'>
              <div className='flex justify-between items-center'>
                <Link
                  to={'/notes'}
                  className='text-blue-400 hover:underline text-lg'
                >
                  Back
                </Link>
                <h1 className='text-3xl font-bold text-center'>
                  {note[0].title}
                </h1>
                <div className='flex gap-2'>
                  <Link
                    to={`/notes/${note[0].id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={editIcon} alt='' className='w-4' />
                  </Link>
                  <div
                    onClick={() => handleDeleteNote(note[0].id)}
                    className='hover:cursor-pointer'
                  >
                    <img src={deleteIcon} alt='' className='w-4' />
                  </div>
                </div>
              </div>
              <div className='border-2 border-black text-xl p-2 rounded-md whitespace-pre-line'>
                {note[0].body}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}
