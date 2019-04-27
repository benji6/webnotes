import * as React from 'react'
import _404 from '../pages/_404'
import {
  SetUserEmailContext,
  UserEmailContext,
  UserLoadingStateContext,
  TLoadingState,
} from '../../contexts'
import { getIdToken } from '../../cognito'

export default function UserContainer(props: Object) {
  const [userLoading, setUserLoadingState] = React.useState<TLoadingState>(
    'loading',
  )
  const [userEmail, setUserEmail] = React.useState<string | undefined>(
    undefined,
  )

  React.useEffect(() => {
    getIdToken().then(
      idToken => {
        setUserEmail(idToken.payload.email)
        setUserLoadingState('done')
      },
      (e: Error) => {
        console.error(e)
        setUserLoadingState('error')
      },
    )
  }, [])

  return (
    <UserLoadingStateContext.Provider value={userLoading}>
      <UserEmailContext.Provider value={userEmail}>
        <SetUserEmailContext.Provider {...props} value={setUserEmail} />
      </UserEmailContext.Provider>
    </UserLoadingStateContext.Provider>
  )
}
