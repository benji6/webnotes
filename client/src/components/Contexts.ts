import * as React from 'react'
import { INote } from '../types'

export const NotesContext = React.createContext<INote[] | undefined>(undefined)
