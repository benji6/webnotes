import * as React from 'react'
import { getNotes } from '../../api'
import { INoteLocal } from '../../types'
import { useUserEmail } from './User'
import { notesDelete, notesGet, notesSet } from '../../localStorage'

const NotesContext = React.createContext<
  [
    INoteLocal[] | undefined,
    React.Dispatch<React.SetStateAction<INoteLocal[] | undefined>>,
  ]
>([undefined, () => {}])

const initialNotes = notesGet()

export const useNotes = () => React.useContext(NotesContext)

export const NotesContainer = (props: Object) => {
  const [notes, setNotes] = React.useState<INoteLocal[] | undefined>(
    initialNotes,
  )
  const [userEmail] = useUserEmail()

  React.useEffect(() => {
    if (!notes) return notesDelete()
    notesSet(notes)
  }, [notes])

  React.useEffect(() => {
    if (userEmail) getNotes().then(setNotes, () => {})
  }, [userEmail])

  return <NotesContext.Provider {...props} value={[notes, setNotes]} />
}
