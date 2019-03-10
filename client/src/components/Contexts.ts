import * as React from 'react'
import { INote } from '../types'

export const NotesContext = React.createContext<INote[] | undefined>(undefined)
export const SetNotesContext = React.createContext<
  React.Dispatch<React.SetStateAction<INote[] | undefined>>
>(() => {})
export const UserEmailContext = React.createContext<string | undefined>(
  undefined,
)
export const UserLoadingContext = React.createContext(false)
export const SetUserEmailContext = React.createContext<
  React.Dispatch<React.SetStateAction<string | undefined>>
>(() => {})
