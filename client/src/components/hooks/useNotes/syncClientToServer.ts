import { ClientNote } from "../../../types";
import { postNote, putNote, deleteNote } from "../../../api";

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
          case "created": {
            const newNote = await postNote({
              body: note.body,
              dateCreated: note.dateCreated,
              dateUpdated: note.dateUpdated,
            });
            notesUpdated = true;
            return newNote;
          }
          case "updated": {
            const newNote = await putNote({
              body: note.body,
              dateCreated: note.dateCreated,
              dateUpdated: note.dateUpdated,
            });
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
