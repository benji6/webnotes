import * as React from 'react'
import { NoteLocal } from '../types'

interface State {
  areNotesLoading: boolean
  isUserLoading: boolean
  notes: NoteLocal[] | undefined
  userEmail: string | undefined
}

type IActionMaker<
  Type extends string,
  Payload = undefined
> = Payload extends undefined
  ? { type: Type }
  : { payload: Payload; type: Type }

type INotesAddAction = IActionMaker<'notes/add', NoteLocal>
type INotesClearAllAction = IActionMaker<'notes/clearAll'>
type INotesDeleteAction = IActionMaker<'notes/delete', string>
type INotesFinishedLoadingAction = IActionMaker<'notes/finishedLoading'>
type INotesSetAction = IActionMaker<'notes/set', NoteLocal[]>
type INotesUpdateAction = IActionMaker<'notes/update', NoteLocal>
type IStorageFinishedLoadingAction = IActionMaker<'storage/finishedLoading'>
type IUserClearEmailAction = IActionMaker<'user/clearEmail'>
type IUserSetEmailAction = IActionMaker<'user/setEmail', string>

type IAction =
  | INotesAddAction
  | INotesClearAllAction
  | INotesDeleteAction
  | INotesFinishedLoadingAction
  | INotesSetAction
  | INotesUpdateAction
  | IStorageFinishedLoadingAction
  | IUserClearEmailAction
  | IUserSetEmailAction

const initialState = {
  areNotesLoading: true,
  isUserLoading: true,
  notes: undefined,
  userEmail: undefined,
}

export const DispatchContext = React.createContext<React.Dispatch<IAction>>(
  () => {},
)
export const StateContext = React.createContext<State>(initialState)

const reducer = (state: State, action: IAction): State => {
  switch (action.type) {
    case 'notes/add':
      return {
        ...state,
        notes: state.notes
          ? [action.payload, ...state.notes]
          : [action.payload],
      }
    case 'notes/clearAll':
      return { ...state, notes: undefined }
    case 'notes/delete':
      if (!state.notes) return state
      return {
        ...state,
        notes: state.notes.map(note =>
          note.dateCreated === action.payload
            ? { ...note, syncState: 'deleted' }
            : note,
        ),
      }
    case 'notes/finishedLoading':
      return { ...state, areNotesLoading: false }
    case 'notes/set':
      return { ...state, notes: action.payload }
    case 'notes/update': {
      if (!state.notes) return { ...state, notes: [action.payload] }
      const index = state.notes.findIndex(
        ({ dateCreated }) => action.payload.dateCreated === dateCreated,
      )
      return {
        ...state,
        notes: [
          action.payload,
          ...state.notes.slice(0, index),
          ...state.notes.slice(index + 1),
        ],
      }
    }
    case 'storage/finishedLoading':
      return { ...state, isUserLoading: false }
    case 'user/clearEmail':
      return { ...state, userEmail: undefined }
    case 'user/setEmail':
      return { ...state, userEmail: action.payload }
  }
}

export default function AppState({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}
