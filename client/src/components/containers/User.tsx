import { Spinner } from 'eri'
import * as React from 'react'
import { getIdToken } from '../../cognito'
import storage from '../../storage'
import { DispatchContext, StateContext } from '../AppState'

export const UserContainer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = React.useContext(DispatchContext)
  const state = React.useContext(StateContext)

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
          dispatch({ type: 'storage/finishedLoading' })
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
    if (state.isUserLoading) return
    if (!state.userEmail) storage.deleteEmail()
    else storage.setEmail(state.userEmail)
  }, [state.isUserLoading, state.userEmail])

  return state.isUserLoading ? <Spinner /> : <>{children}</>
}
