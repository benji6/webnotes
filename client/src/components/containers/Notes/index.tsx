import * as React from 'react'
import { getNotes } from '../../../api'
import { INoteLocal } from '../../../types'
import { useUserEmail } from '../User'
import { notesDelete, notesGet, notesSet } from '../../../localStorage'
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

let timeoutId: NodeJS.Timeout

export const useNotes = () => React.useContext(NotesContext)

export const NotesContainer = (props: Object) => {
  const [notes, setNotes] = React.useState<INoteLocal[] | undefined>(
    initialNotes,
  )
  const [userEmail] = useUserEmail()

  React.useEffect(() => {
    if (!notes) return notesDelete()
    notesSet(notes)
    syncLocalToRemote(notes).then(({ error, notes, notesUpdated }) => {
      if (error) {
        clearTimeout(timeoutId)
        // trigger another sync attempt in 1 minute
        timeoutId = setTimeout(
          () => setNotes(notes => notes && [...notes]),
          syncInterval,
        )
      }
      if (!notesUpdated) return
      setNotes(notes)
    })
  }, [notes])
  const fetchNotes = React.useRef(() => {
    if (!userEmail) return
    getNotes().then(
      remoteNotes =>
        setNotes(notes ? syncRemoteToLocal(notes, remoteNotes) : remoteNotes),
      () => {},
    )
  })
  React.useEffect(fetchNotes.current, [userEmail])
  useInterval(fetchNotes.current, syncInterval)
  return <NotesContext.Provider {...props} value={[notes, setNotes]} />
}
