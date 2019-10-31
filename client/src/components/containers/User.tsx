import * as React from 'react'
import { getIdToken } from '../../cognito'
import storage from '../../storage'

const UserEmailContext = React.createContext<
  [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
>([undefined, () => {}])

const initialUserEmail = storage.getEmail()

export const useUserEmail = () => React.useContext(UserEmailContext)

export const UserContainer = (props: Object) => {
  const [userEmail, setUserEmail] = React.useState<string | undefined>(
    initialUserEmail,
  )

  React.useEffect(() => {
    if (!userEmail) return storage.deleteEmail()
    storage.setEmail(userEmail)
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
