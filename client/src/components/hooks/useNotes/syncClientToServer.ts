import { ClientNote, Note, Patch } from "../../../types";
import { patchNotes } from "../../../api";

export default async function syncClientToServer(
  notes: ClientNote[],
): Promise<ClientNote[]> {
  const patch: Patch = {};
  const newNotes: ClientNote[] = [];

  for (const note of notes) {
    if (!note.syncState) newNotes.push(note);

    switch (note.syncState) {
      case "deleted":
        if (patch.delete) patch.delete.push(note.dateCreated);
        else patch.delete = [note.dateCreated];
        continue;
      case "created":
      case "updated": {
        const newNote: Note = {
          body: note.body,
          dateCreated: note.dateCreated,
          dateUpdated: note.dateUpdated,
        };
        if (note.tag) newNote.tag = note.tag;
        if (patch.put) patch.put.push(newNote);
        else patch.put = [newNote];
        newNotes.push(newNote);
      }
    }
  }

  if (!patch.delete?.length) delete patch.delete;
  if (!patch.put?.length) delete patch.put;

  await patchNotes(patch);
  return newNotes;
}
