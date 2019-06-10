import { INote, INoteLocal } from '../../../types'

export default function syncRemoteToLocal(
  localNotes: INoteLocal[],
  remoteNotes: INote[],
): INoteLocal[] {
  let syncedNotes: INoteLocal[] = []
  for (const localNote of localNotes) {
    if (localNote.syncState === 'created') {
      syncedNotes.push(localNote)
      continue
    }
    const remoteNote = remoteNotes.find(
      ({ dateCreated }) => dateCreated === localNote.dateCreated,
    )
    if (!remoteNote) continue
    if (remoteNote.dateUpdated > localNote.dateUpdated) {
      syncedNotes.push(remoteNote)
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
    }
  }
  return syncedNotes.sort((a, b) =>
    a.dateUpdated > b.dateUpdated ? -1 : a.dateUpdated < b.dateUpdated ? 1 : 0,
  )
}
