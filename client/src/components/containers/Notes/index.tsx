import * as React from 'react'
import { getNotes } from '../../../api'
import { INoteLocal } from '../../../types'
import storage from '../../../storage'
import syncLocalToRemote from './syncLocalToRemote'
import syncRemoteToLocal from './syncRemoteToLocal'
import useInterval from '../../hooks/useInterval'
import { StateContext } from '../../AppState'

const syncInterval = 6e4

const NotesContext = React.createContext<
  [
    INoteLocal[] | undefined,
    React.Dispatch<React.SetStateAction<INoteLocal[] | undefined>>,
  ]
>([undefined, () => {}])

export const useNotes = () => React.useContext(NotesContext)

export const NotesContainer = ({ children }: { children: React.ReactNode }) => {
  const [isStorageLoading, setIsStorageLoading] = React.useState(true)
  const [notes, setNotes] = React.useState<INoteLocal[] | undefined>()
  const { userEmail } = React.useContext(StateContext)

  React.useEffect(
    () =>
      void (async () => {
        try {
          setNotes(await storage.getNotes())
        } finally {
          setIsStorageLoading(false)
        }
      })(),
    [],
  )

  React.useEffect(() => {
    if (isStorageLoading) return
    if (!notes) storage.deleteNotes()
    else storage.setNotes(notes)
  }, [isStorageLoading, notes])

  const fetchNotes = () =>
    void (async () => {
      if (isStorageLoading || !userEmail) return
      const remoteNotes = await getNotes()
      if (!notes) return setNotes(remoteNotes)
      const { notes: newNotes, notesUpdated } = syncRemoteToLocal(
        notes,
        remoteNotes,
      )
      if (notesUpdated) setNotes(newNotes)
    })()

  const updateNotes = () =>
    void (async () => {
      if (
        isStorageLoading ||
        !userEmail ||
        !notes ||
        !notes.some(({ syncState }) => syncState)
      )
        return
      const { notes: newNotes, notesUpdated } = await syncLocalToRemote(notes)
      if (notesUpdated) setNotes(newNotes)
    })()

  React.useEffect(fetchNotes, [isStorageLoading, userEmail])
  React.useEffect(updateNotes, [isStorageLoading, notes])
  useInterval(fetchNotes, syncInterval)
  useInterval(updateNotes, syncInterval)
  return isStorageLoading ? null : (
    <NotesContext.Provider value={[notes, setNotes]}>
      {children}
    </NotesContext.Provider>
  )
}
