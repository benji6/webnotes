import { del, get, set } from 'idb-keyval'
import { INoteLocal } from './types'

const emailStorageKey = 'webnotes-user-email'
const notesStorageKey = 'webnotes-notes'
localStorage.removeItem('notes')
localStorage.removeItem('userEmail')
export default {
  deleteEmail: (): Promise<void> => del(emailStorageKey),
  deleteEmailOld: (): void => localStorage.removeItem('user-email'),
  getEmail: (): Promise<string | undefined> => get(emailStorageKey),
  getEmailOld: (): string | undefined =>
    localStorage.getItem('user-email') || undefined,
  setEmail: (email: string): Promise<void> => set(emailStorageKey, email),
  deleteNotes: (): Promise<void> => del(notesStorageKey),
  getNotes: (): Promise<INoteLocal[] | undefined> => get(notesStorageKey),
  deleteNotesOld: (): void => localStorage.removeItem('notes'),
  getNotesOld: (): INoteLocal[] | undefined => {
    const notesString = localStorage.getItem('notes')
    if (notesString) {
      try {
        return JSON.parse(notesString)
      } catch (e) {
        console.error(`localStorage ${notesStorageKey} corrupt: `, e)
        localStorage.removeItem(notesStorageKey)
      }
    }
  },
  setNotes: (notes: INoteLocal[]): Promise<void> => set(notesStorageKey, notes),
}
