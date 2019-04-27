import * as React from 'react'
import _404 from '../pages/_404'
import {
  SetUserEmailContext,
  UserEmailContext,
  UserLoadingContext,
} from '../../contexts'
import { getIdToken } from '../../cognito'

export default function UserContainer(props: Object) {
  const [userLoading, setUserLoading] = React.useState(true)
  const [userEmail, setUserEmail] = React.useState<string | undefined>(
    undefined,
  )

  React.useEffect(() => {
    getIdToken().then(
      idToken => {
        setUserEmail(idToken.payload.email)
        setUserLoading(false)
      },
      () => setUserLoading(false),
    )
  }, [])

  return (
    <UserLoadingContext.Provider value={userLoading}>
      <UserEmailContext.Provider value={userEmail}>
        <SetUserEmailContext.Provider {...props} value={setUserEmail} />
      </UserEmailContext.Provider>
    </UserLoadingContext.Provider>
  )
}
