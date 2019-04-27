import * as React from 'react'
import _404 from '../pages/_404'
import { getNotes } from '../../api'
import { INote } from '../../types'
import {
  NotesContext,
  NotesLoadingStateContext,
  SetNotesContext,
  TLoadingState,
  UserEmailContext,
} from '../../contexts'

export default function NotesContainer(props: Object) {
  const [notesLoadingState, setNotesLoadingState] = React.useState<
    TLoadingState
  >('loading')
  const [notes, setNotes] = React.useState<INote[] | undefined>(undefined)
  const userEmail = React.useContext(UserEmailContext)

  React.useEffect(() => {
    if (userEmail)
      getNotes()
        .then(notes => {
          setNotes(notes)
          setNotesLoadingState('done')
        })
        .catch(() => setNotesLoadingState('error'))
  }, [userEmail])

  return (
    <NotesLoadingStateContext.Provider value={notesLoadingState}>
      <NotesContext.Provider value={notes}>
        <SetNotesContext.Provider {...props} value={setNotes} />
      </NotesContext.Provider>
    </NotesLoadingStateContext.Provider>
  )
}
