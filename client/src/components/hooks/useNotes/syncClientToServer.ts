import { ClientNote, Note, Patch } from "../../../types";
import { patchNotes } from "../../../api";

export default async function syncClientToServer(
  notes: ClientNote[]
): Promise<ClientNote[]> {
  let patch: Patch = { delete: [], put: [] };
  let newNotes: ClientNote[] = [];

  for (const note of notes) {
    if (!note.syncState) newNotes.push(note);

    switch (note.syncState) {
      case "deleted":
        patch.delete!.push(note.dateCreated);
        continue;
      case "created":
      case "updated": {
        const newNote: Note = {
          body: note.body,
          dateCreated: note.dateCreated,
          dateUpdated: note.dateUpdated,
        };
        if (note.tag) newNote.tag = note.tag;
        patch.put!.push(newNote);
        newNotes.push(newNote);
      }
    }
  }

  if (!patch.delete!.length) delete patch.delete;
  if (!patch.put!.length) delete patch.put;

  await patchNotes(patch);
  return newNotes;
}
