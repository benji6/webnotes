import * as React from 'react'
import { NoteLocal } from '../types'

type FluxStandardAction<
  Type extends string,
  Payload = undefined
> = Payload extends undefined
  ? { type: Type }
  : { payload: Payload; type: Type }

type Action =
  | FluxStandardAction<'notes/add', NoteLocal>
  | FluxStandardAction<'notes/clearAll'>
  | FluxStandardAction<'notes/delete', string>
  | FluxStandardAction<'notes/finishedLoading'>
  | FluxStandardAction<'notes/set', NoteLocal[]>
  | FluxStandardAction<'notes/update', NoteLocal>
  | FluxStandardAction<'storage/finishedLoading'>
  | FluxStandardAction<'user/clearEmail'>
  | FluxStandardAction<'user/setEmail', string>

type Diff<T, U> = T extends U ? never : T
type Filter<T, U> = T extends U ? T : never
type ActionsWithPayloads = Filter<Action, { payload: any }>
type ActionsWithoutPayloads = Diff<Action, ActionsWithPayloads>

function createAction<Type extends ActionsWithoutPayloads['type']>(
  type: Type,
): () => FluxStandardAction<Type>
function createAction<Type extends ActionsWithPayloads['type']>(
  type: Type,
): <Payload extends ActionsWithPayloads['payload']>(
  payload: Payload,
) => FluxStandardAction<Type, Payload>
function createAction<Type extends Action['type']>(type: Type) {
  function actionCreator(): FluxStandardAction<Type>
  function actionCreator<Payload extends ActionsWithPayloads['payload']>(
    payload: Payload,
  ): FluxStandardAction<Type, Payload>
  function actionCreator<Payload extends ActionsWithPayloads['payload']>(
    payload?: Payload,
  ) {
    return payload ? { payload, type } : { type }
  }
  return actionCreator
}

interface State {
  areNotesLoading: boolean
  isUserLoading: boolean
  notes: NoteLocal[] | undefined
  userEmail: string | undefined
}

const initialState: State = {
  areNotesLoading: true,
  isUserLoading: true,
  notes: undefined,
  userEmail: undefined,
}

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
)
export const StateContext = React.createContext<State>(initialState)

const reducer = (state: State, action: Action): State => {
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
