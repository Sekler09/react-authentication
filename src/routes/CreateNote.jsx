import React, {useEffect, useState} from 'react'
import {Link, useLoaderData, useNavigate} from 'react-router-dom'
import {useUserContext} from '../components/UserContextProvider'
import fetchData from '../functions/Fetch'

export const loader = async () => {
  const newId = fetchData('notes').then(notes=> Math.max(...(notes.map((note) => note.id)))+1)
  return newId
}

export default function CreateNote() {
  const {user} = useUserContext()
  const id = useLoaderData()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const handleNoteTextChange = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
    setText(e.target.value)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let noteErrors = {}
    if (!title.trim()) {
      noteErrors.title = 'Title is reqired'
    }
    if (!text.trim()) {
      noteErrors.text = 'Text is reqired'
    }
    setErrors(noteErrors)
    setIsSubmited(true)
  }

  useEffect(() => {
    if (!Object.keys(errors).length && isSubmited) {
      const note = {
        id,
        title,
        userId: user.id,
        body: text,
        createdAt: new Date().toISOString(),
      }
      fetchData('notes',{}, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => navigate(`/notes/${id}`))
        .catch(() => console.log('bad luck'))
      setIsSubmited(false)
    }
  }, [isSubmited, errors, text, title, navigate, id, user])

  return (
    <div>
      <form className="form w-full flex flex-col gap-5">
        <div className='relative flex items-center justify-center'>
          <h1 className="text-3xl font-bold text-center ">Create new note</h1>
          <Link to="/notes" className="text-blue-400 hover:underline absolute left-0 text-lg">
            Back
          </Link>
        </div>
        <div>
          <input
            placeholder="Title"
            className="input"
            onChange={handleTitleChange}
          />
          <p className="text-red-500">{errors.title}</p>
        </div>
        <div>
          <textarea
            placeholder="Note text..."
            className="input resize-none min-h-[80px] overflow-hidden box-box"
            type="textarea"
            onChange={handleNoteTextChange}
          />
          <p className="text-red-500">{errors.text}</p>
        </div>
        <button className="btn self-center" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  )
}
