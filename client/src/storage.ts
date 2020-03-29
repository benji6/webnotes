import { del, get, set } from "idb-keyval";
import { ClientNote } from "./types";

const emailStorageKey = "webnotes-user-email";
const notesStorageKey = "webnotes-notes";

export default {
  deleteEmail: (): Promise<void> => del(emailStorageKey),
  getEmail: (): Promise<string | undefined> => get(emailStorageKey),
  setEmail: (email: string): Promise<void> => set(emailStorageKey, email),
  deleteNotes: (): Promise<void> => del(notesStorageKey),
  getNotes: (): Promise<ClientNote[] | undefined> => get(notesStorageKey),
  setNotes: (notes: ClientNote[]): Promise<void> => set(notesStorageKey, notes),
};
