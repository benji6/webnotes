import { Note, NoteLocal } from '../../../types'

export default function syncRemoteToLocal(
  localNotes: NoteLocal[],
  remoteNotes: Note[],
): {
  notes: NoteLocal[]
  notesUpdated: boolean
} {
  let notesUpdated = false
  let syncedNotes: NoteLocal[] = []
  for (const localNote of localNotes) {
    if (localNote.syncState === 'created') {
      syncedNotes.push(localNote)
      continue
    }
    const remoteNote = remoteNotes.find(
      ({ dateCreated }) => dateCreated === localNote.dateCreated,
    )
    if (!remoteNote) {
      notesUpdated = true
      continue
    }
    if (remoteNote.dateUpdated > localNote.dateUpdated) {
      syncedNotes.push(remoteNote)
      notesUpdated = true
      continue
    }
    syncedNotes.push(localNote)
  }
  for (const remoteNote of remoteNotes) {
    if (
      !localNotes.some(
        ({ dateCreated }) => dateCreated === remoteNote.dateCreated,
      )
    ) {
      syncedNotes.push(remoteNote)
      notesUpdated = true
    }
  }
  return {
    notes: syncedNotes.sort((a, b) =>
      a.dateUpdated > b.dateUpdated
        ? -1
        : a.dateUpdated < b.dateUpdated
        ? 1
        : 0,
    ),
    notesUpdated,
  }
}
