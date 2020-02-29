import * as React from 'react'
import { getNotes } from '../../../api'
import storage from '../../../storage'
import syncLocalToRemote from './syncLocalToRemote'
import syncRemoteToLocal from './syncRemoteToLocal'
import useInterval from '../useInterval'
import { StateContext, DispatchContext } from '../../AppState'

const syncInterval = 6e4

export default function useNotes(): void {
  const dispatch = React.useContext(DispatchContext)
  const state = React.useContext(StateContext)
  const { userEmail } = React.useContext(StateContext)

  React.useEffect(
    () =>
      void (async () => {
        try {
          const storedNotes = await storage.getNotes()
          if (storedNotes) {
            dispatch({ type: 'notes/set', payload: storedNotes })
          } else {
            dispatch({ type: 'notes/clearAll' })
          }
        } finally {
          dispatch({ type: 'notes/finishedLoading' })
        }
      })(),
    [],
  )

  React.useEffect(() => {
    if (state.areNotesLoading) return
    if (!state.notes) storage.deleteNotes()
    else storage.setNotes(state.notes)
  }, [state.areNotesLoading, state.notes])

  const fetchNotes = () =>
    void (async () => {
      if (state.areNotesLoading || !userEmail) return
      const remoteNotes = await getNotes()
      if (!state.notes)
        return dispatch({ type: 'notes/set', payload: remoteNotes })
      const { notes: newNotes, notesUpdated } = syncRemoteToLocal(
        state.notes,
        remoteNotes,
      )
      if (notesUpdated) dispatch({ type: 'notes/set', payload: newNotes })
    })()

  const updateNotes = () =>
    void (async () => {
      if (
        state.areNotesLoading ||
        !userEmail ||
        !state.notes ||
        !state.notes.some(({ syncState }) => syncState)
      )
        return
      const { notes: newNotes, notesUpdated } = await syncLocalToRemote(
        state.notes,
      )
      if (notesUpdated) dispatch({ type: 'notes/set', payload: newNotes })
    })()

  React.useEffect(fetchNotes, [state.areNotesLoading, userEmail])
  React.useEffect(updateNotes, [state.areNotesLoading, state.notes])
  useInterval(fetchNotes, syncInterval)
  useInterval(updateNotes, syncInterval)
}
