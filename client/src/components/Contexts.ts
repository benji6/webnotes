import * as React from 'react'
import { INote } from '../types'

export const NotesContext = React.createContext<INote[] | undefined>(undefined)
export const SetNotesContext = React.createContext<
  React.Dispatch<React.SetStateAction<INote[]>>
>(() => {})
