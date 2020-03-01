import { NoteLocal } from '../../../types'
import { postNote, putNote, deleteNote } from '../../../api'

export default async function syncLocalToRemote(
  notes: NoteLocal[],
): Promise<{
  notes: NoteLocal[]
  notesUpdated: boolean
}> {
  let notesUpdated = false
  const newNotes = await Promise.all(
    notes.map(async note => {
      if (!note.syncState) return note
      try {
        switch (note.syncState) {
          case 'deleted':
            await deleteNote({ dateCreated: note.dateCreated })
            notesUpdated = true
            return
          case 'created': {
            const newNote = await postNote({
              body: note.body,
              dateCreated: note.dateCreated,
              dateUpdated: note.dateUpdated,
            })
            notesUpdated = true
            return newNote
          }
          case 'updated': {
            const newNote = await putNote({
              body: note.body,
              dateCreated: note.dateCreated,
              dateUpdated: note.dateUpdated,
            })
            notesUpdated = true
            return newNote
          }
        }
      } catch {
        return note
      }
    }),
  )
  return {
    notes: newNotes.filter(Boolean) as NoteLocal[],
    notesUpdated,
  }
}
