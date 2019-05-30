import * as React from 'react'
import { getIdToken } from '../../cognito'

const UserEmailContext = React.createContext<
  [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
>([undefined, () => {}])

const storageKey = 'userEmail'
const storedUserEmail = localStorage.getItem(storageKey)
const initialUserEmail = storedUserEmail ? storedUserEmail : undefined

export const useUserEmail = () => React.useContext(UserEmailContext)

export const UserContainer = (props: Object) => {
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
      },
      (e: Error) => {
        if (e.message === 'no current user') return setUserEmail(undefined)
        console.error(e)
      },
    )
  }, [])

  return (
    <UserEmailContext.Provider {...props} value={[userEmail, setUserEmail]} />
  )
}
