import * as React from 'react'

type IState = {
  isStorageLoading: boolean
  userEmail: string | undefined
}

type IActionMaker<
  Type extends string,
  Payload = undefined
> = Payload extends undefined
  ? { type: Type }
  : { payload: Payload; type: Type }

type IStorageFinishedLoadingAction = IActionMaker<'storage/finishedLoading'>
type IUserClearEmailAction = IActionMaker<'user/clearEmail'>
type IUserSetEmailAction = IActionMaker<'user/setEmail', string>

type IAction =
  | IStorageFinishedLoadingAction
  | IUserClearEmailAction
  | IUserSetEmailAction

const initialState = { isStorageLoading: true, userEmail: undefined }

export const DispatchContext = React.createContext<React.Dispatch<IAction>>(
  () => {},
)
export const StateContext = React.createContext<IState>(initialState)

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'storage/finishedLoading':
      return { ...state, isStorageLoading: false }
    case 'user/clearEmail':
      return { ...state, userEmail: undefined }
    case 'user/setEmail':
      return { ...state, userEmail: action.payload }
  }
}

export const AppState = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}
