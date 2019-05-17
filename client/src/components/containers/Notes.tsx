import * as React from 'react'
import _404 from '../pages/_404'
import { getNotes } from '../../api'
import { INote } from '../../types'
import { useUserEmail } from './User'

const NotesContext = React.createContext<
  [
    INote[] | undefined,
    React.Dispatch<React.SetStateAction<INote[] | undefined>>
  ]
>([undefined, () => {}])

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

export const useNotes = () => React.useContext(NotesContext)

export const NotesContainer = (props: Object) => {
  const [notes, setNotes] = React.useState<INote[] | undefined>(initialNotes)
  const [userEmail] = useUserEmail()

  React.useEffect(() => {
    if (!notes) return localStorage.removeItem(storageKey)
    localStorage.setItem(storageKey, JSON.stringify(notes))
  }, [notes])

  React.useEffect(() => {
    if (userEmail) getNotes().then(setNotes, () => {})
  }, [userEmail])

  return <NotesContext.Provider {...props} value={[notes, setNotes]} />
}
