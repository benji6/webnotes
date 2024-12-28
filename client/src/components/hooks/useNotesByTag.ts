import { useContext } from "react";
import { ClientNote } from "../../types";
import { StateContext } from "../AppState";

export function useNotesByTag() {
  const state = useContext(StateContext);
  const notesByTag = new Map<string | undefined, ClientNote[]>();
  if (state.notes)
    for (const note of state.notes) {
      if (note.syncState === "deleted") continue;
      const tagNotes = notesByTag.get(note.tag);
      if (tagNotes) tagNotes.push(note);
      else notesByTag.set(note.tag, [note]);
    }
  return notesByTag;
}
