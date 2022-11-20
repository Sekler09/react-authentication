import React, {useEffect, useState} from 'react'
import {Link, useLoaderData, useNavigate} from 'react-router-dom'
import {useUserContext} from '../components/UserContextProvider'
import fetchData from '../functions/Fetch'

export default function EditNote() {
  const {user} = useUserContext()
  const noteId = useLoaderData()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleNoteTextChange = (e) => {
    changeHeight(e)
    setText(e.target.value)
  }

  const changeHeight = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
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
    fetchData('notes', {userId: user.id, id: noteId}).then((notes) => {
      setTitle(notes[0].title)
      setText(notes[0].body)
    })
  }, [user, noteId])

  useEffect(() => {
    if (!Object.keys(errors).length && isSubmited) {
      const editedNote = {
        title,
        body: text,
      }
      fetchData(
        `notes/${noteId}`,
        {userId: user.id},
        {
          method: 'PATCH',
          body: JSON.stringify(editedNote),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(() => navigate(`/notes`))
        .catch(() => console.log('bad luck'))
    } else {
      setIsSubmited(false)
    }
  }, [errors, isSubmited, navigate, noteId, text, title, user])

  return (
    <div>
      <form className='form w-full flex flex-col gap-5'>
        <div className='relative flex items-center justify-center'>
          <h1 className='text-3xl font-bold text-center '>Edit note</h1>
          <Link
            to={`/notes`}
            className='text-blue-400 hover:underline absolute left-0 text-lg'
          >
            Back to notes
          </Link>
        </div>
        <div>
          <input
            value={title}
            placeholder='Title'
            className='input'
            onChange={handleTitleChange}
          />
          <p className='text-red-500'>{errors.title}</p>
        </div>
        <div>
          <textarea
            value={text}
            placeholder='Note text...'
            className='input resize-none h-auto overflow-hidden box-box'
            type='textarea'
            onChange={handleNoteTextChange}
            onFocus={changeHeight}
          />
          <p className='text-red-500'>{errors.text}</p>
        </div>
        <button className='btn self-center' onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  )
}
