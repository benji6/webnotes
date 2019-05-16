import * as React from 'react'
import _404 from '../pages/_404'
import {
  SetUserEmailContext,
  UserEmailContext,
  UserLoadingErrorContext,
} from '../../contexts'
import { getIdToken } from '../../cognito'

const storageKey = 'userEmail'
const storedUserEmail = localStorage.getItem(storageKey)
const initialUserEmail = storedUserEmail ? storedUserEmail : undefined

export default function UserContainer(props: Object) {
  const [userLoadingError, setUserLoadingError] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState<string | undefined>(
    initialUserEmail,
  )

  React.useEffect(() => {
    if (!userEmail) return localStorage.removeItem(storageKey)
    localStorage.setItem(storageKey, userEmail)
  }, [userEmail])

  React.useEffect(() => {
    getIdToken().then(
      idToken => {
        setUserEmail(idToken.payload.email)
        setUserLoadingError(false)
      },
      (e: Error) => {
        if (e.message === 'no current user') return setUserLoadingError(false)
        console.error(e)
        setUserEmail(undefined)
        setUserLoadingError(true)
      },
    )
  }, [])

  return (
    <UserLoadingErrorContext.Provider value={userLoadingError}>
      <UserEmailContext.Provider value={userEmail}>
        <SetUserEmailContext.Provider {...props} value={setUserEmail} />
      </UserEmailContext.Provider>
    </UserLoadingErrorContext.Provider>
  )
}
