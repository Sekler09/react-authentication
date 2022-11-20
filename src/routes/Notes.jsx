import React, {useEffect, useState} from 'react'
import {useUserContext} from '../components/UserContextProvider'
import editIcon from '../assets/icons/edit.png'
import deleteIcon from '../assets/icons/bin.png'
import {Link, useNavigate} from 'react-router-dom'
import fetchData from '../functions/Fetch'

export default function Notes() {
  const navigate = useNavigate()
  const {user} = useUserContext()
  const userId = user.id
  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    fetchData('notes', {userId})
    .then(notes => setNotes(notes))
  }, [userId])
  
  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`)
  }
  
  const handleDeleteNote = (e, noteId) => {
    e.stopPropagation()
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm('Are u sure?')
    if(conf){
    fetchData(`notes/${noteId}`, {userId : user.id}, {
      method: 'DELETE',
    })
    setNotes(notes.filter(note => note.id !== noteId))
  }
}
  return (
    <div className="form w-full flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-center">Notes</h1>
      <Link to="/notes/create" className="btn">
        Add new note
      </Link>
      <div className="flex flex-col gap-3">
        {notes
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((note) => (
            <div
              onClick={() => handleNoteClick(note.id)}
              key={note.id}
              className="flex justify-between border rounded-md items-baseline p-2 bg-slate-300 shadow-md "
            >
              <div className="flex gap-2 items-baseline">
                <p className="text-xl font-semibold">{note.title}</p>
                <p className="text-zinc-400">
                  {new Date(note.createdAt)
                    .toLocaleDateString('en-GB', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric',
                    })
                    .replace(/\//g, '.')}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/notes/${note.id}/edit`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={editIcon} alt="" className="w-4" />
                </Link>
                <div onClick={(e) => handleDeleteNote(e, note.id)} className='hover:cursor-pointer'>
                  <img src={deleteIcon} alt="" className="w-4" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
