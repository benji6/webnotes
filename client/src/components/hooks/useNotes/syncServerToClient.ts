import { Note, ClientNote } from "../../../types";

export default function syncServerToClient(
  clientNotes: ClientNote[],
  serverNotes: Note[],
): {
  notes: ClientNote[];
  notesUpdated: boolean;
} {
  let notesUpdated = false;
  const syncedNotes: ClientNote[] = [];
  for (const clientNote of clientNotes) {
    if (clientNote.syncState === "created") {
      syncedNotes.push(clientNote);
      continue;
    }
    const serverNote = serverNotes.find(
      ({ dateCreated }) => dateCreated === clientNote.dateCreated,
    );
    if (!serverNote) {
      notesUpdated = true;
      continue;
    }
    if (serverNote.dateUpdated > clientNote.dateUpdated) {
      syncedNotes.push(serverNote);
      notesUpdated = true;
      continue;
    }
    syncedNotes.push(clientNote);
  }
  for (const serverNote of serverNotes) {
    if (
      !clientNotes.some(
        ({ dateCreated }) => dateCreated === serverNote.dateCreated,
      )
    ) {
      syncedNotes.push(serverNote);
      notesUpdated = true;
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
  };
}
