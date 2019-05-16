import * as React from 'react'
import _404 from '../pages/_404'
import { getNotes } from '../../api'
import { INote } from '../../types'
import {
  NotesContext,
  NotesLoadingErrorContext,
  SetNotesContext,
  UserEmailContext,
} from '../../contexts'

const storageKey = 'notes'
const storedNotesString = localStorage.getItem(storageKey)
let storedNotes

if (storedNotesString) {
  try {
    storedNotes = JSON.parse(storedNotesString)
  } catch (e) {
    console.error(`localStorage ${storageKey} corrupt: `, e)
    localStorage.removeItem(storageKey)
  }
}

const initialNotes = storedNotes ? storedNotes : undefined

export default function NotesContainer(props: Object) {
  const [notesLoadingError, setNotesLoadingError] = React.useState(false)
  const [notes, setNotes] = React.useState<INote[] | undefined>(initialNotes)
  const userEmail = React.useContext(UserEmailContext)

  React.useEffect(() => {
    if (!notes) return localStorage.removeItem(storageKey)
    localStorage.setItem(storageKey, JSON.stringify(notes))
  }, [notes])

  React.useEffect(() => {
    if (userEmail)
      getNotes()
        .then(notes => {
          setNotes(notes)
          setNotesLoadingError(false)
        })
        .catch(() => setNotesLoadingError(true))
  }, [userEmail])

  return (
    <NotesLoadingErrorContext.Provider value={notesLoadingError}>
      <NotesContext.Provider value={notes}>
        <SetNotesContext.Provider {...props} value={setNotes} />
      </NotesContext.Provider>
    </NotesLoadingErrorContext.Provider>
  )
}
