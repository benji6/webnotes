import { Spinner } from 'eri'
import * as React from 'react'
import { getIdToken } from '../../cognito'
import storage from '../../storage'

type IActionMaker<
  Type extends string,
  Payload = undefined
> = Payload extends undefined
  ? { type: Type }
  : { payload: Payload; type: Type }

type IState = {
  isStorageLoading: boolean
  userEmail: string | undefined
}

type IStorageStoppedLoadingAction = IActionMaker<'storage/stoppedLoading'>
type IUserClearEmailAction = IActionMaker<'user/clearEmail'>
type IUserSetEmailAction = IActionMaker<'user/setEmail', string>

type IAction =
  | IStorageStoppedLoadingAction
  | IUserClearEmailAction
  | IUserSetEmailAction

const initialState = { isStorageLoading: true, userEmail: undefined }

export const UserDispatchContext = React.createContext<React.Dispatch<IAction>>(
  () => {},
)
export const UserStateContext = React.createContext<IState>(initialState)

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'storage/stoppedLoading':
      return { ...state, isStorageLoading: false }
    case 'user/clearEmail':
      return { ...state, userEmail: undefined }
    case 'user/setEmail':
      return { ...state, userEmail: action.payload }
  }
}

export const UserContainer = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(
    () =>
      void (async () => {
        try {
          const storedEmail = await storage.getEmail()
          if (storedEmail) {
            dispatch({ type: 'user/setEmail', payload: storedEmail })
          } else {
            dispatch({ type: 'user/clearEmail' })
          }
        } finally {
          dispatch({ type: 'storage/stoppedLoading' })
        }
        try {
          const idToken = await getIdToken()
          dispatch({ type: 'user/setEmail', payload: idToken.payload.email })
        } catch (e) {
          if (e.message === 'no current user')
            dispatch({ type: 'user/clearEmail' })
        }
      })(),
    [],
  )

  React.useEffect(() => {
    if (state.isStorageLoading) return
    if (!state.userEmail) storage.deleteEmail()
    else storage.setEmail(state.userEmail)
  }, [state.isStorageLoading, state.userEmail])

  return state.isStorageLoading ? (
    <Spinner />
  ) : (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  )
}
