import * as React from 'react'
import { getNotes } from '../../../api'
import { INoteLocal } from '../../../types'
import { useUserEmail } from '../User'
import { notesDelete, notesGet, notesSet } from '../../../storage'
import syncLocalToRemote from './syncLocalToRemote'
import syncRemoteToLocal from './syncRemoteToLocal'
import useInterval from '../../hooks/useInterval'

const syncInterval = 6e4

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

  const fetchNotes = () => {
    if (!userEmail) return
    getNotes().then(remoteNotes => {
      if (!notes) return setNotes(remoteNotes)
      const { notes: newNotes, notesUpdated } = syncRemoteToLocal(
        notes,
        remoteNotes,
      )
      if (notesUpdated) setNotes(newNotes)
    })
  }
  const updateNotes = async () => {
    if (!userEmail || !notes || !notes.some(({ syncState }) => syncState))
      return
    const { notes: newNotes, notesUpdated } = await syncLocalToRemote(notes)
    if (notesUpdated) setNotes(newNotes)
  }

  React.useEffect(fetchNotes, [userEmail])
  React.useEffect(() => {
    updateNotes()
  }, [notes])
  useInterval(fetchNotes, syncInterval)
  useInterval(updateNotes, syncInterval)
  return <NotesContext.Provider {...props} value={[notes, setNotes]} />
}
