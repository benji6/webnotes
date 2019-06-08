import { INoteLocal } from './types'

const emailStorageKey = 'userEmail'
const notesStorageKey = 'notes'

export const emailDelete = () => localStorage.removeItem(emailStorageKey)

export const emailGet = (): string | undefined =>
  localStorage.getItem(emailStorageKey) || undefined

export const emailSet = (email: string) =>
  localStorage.setItem(emailStorageKey, email)

export const notesDelete = () => localStorage.removeItem(notesStorageKey)

export const notesGet = (): INoteLocal[] | undefined => {
  const notesString = localStorage.getItem(notesStorageKey)
  if (notesString) {
    try {
      return JSON.parse(notesString)
    } catch (e) {
      console.error(`localStorage ${notesStorageKey} corrupt: `, e)
      localStorage.removeItem(notesStorageKey)
    }
  }
}

export const notesSet = (notes: INoteLocal[]) =>
  localStorage.setItem(notesStorageKey, JSON.stringify(notes))
