import { INoteLocal } from './types'

const emailStorageKey = 'userEmail'
const notesStorageKey = 'notes'

export default {
  deleteEmail: (): void => localStorage.removeItem(emailStorageKey),
  getEmail: (): string | undefined =>
    localStorage.getItem(emailStorageKey) || undefined,
  setEmail: (email: string): void =>
    localStorage.setItem(emailStorageKey, email),
  deleteNotes: (): void => localStorage.removeItem(notesStorageKey),
  getNotes: (): INoteLocal[] | undefined => {
    const notesString = localStorage.getItem(notesStorageKey)
    if (notesString) {
      try {
        return JSON.parse(notesString)
      } catch (e) {
        console.error(`localStorage ${notesStorageKey} corrupt: `, e)
        localStorage.removeItem(notesStorageKey)
      }
    }
  },
  setNotes: (notes: INoteLocal[]): void =>
    localStorage.setItem(notesStorageKey, JSON.stringify(notes)),
}
