import { ClientNote } from "../../../types";
import { deleteNote, putNote } from "../../../api";

export default async function syncClientToServer(
  notes: ClientNote[]
): Promise<{
  error: boolean;
  notes: ClientNote[];
  notesUpdated: boolean;
}> {
  let notesUpdated = false;
  let error = false;
  const newNotes = await Promise.all(
    notes.map(async (note) => {
      if (!note.syncState) return note;
      try {
        switch (note.syncState) {
          case "deleted":
            await deleteNote({ dateCreated: note.dateCreated });
            notesUpdated = true;
            return;
          case "created":
          case "updated": {
            const newNote = {
              body: note.body,
              dateCreated: note.dateCreated,
              dateUpdated: note.dateUpdated,
            };
            await putNote(newNote);
            notesUpdated = true;
            return newNote;
          }
        }
      } catch {
        error = true;
        return note;
      }
    })
  );
  return {
    error,
    notes: newNotes.filter(Boolean) as ClientNote[],
    notesUpdated,
  };
}
