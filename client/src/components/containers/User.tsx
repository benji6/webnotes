import * as React from 'react'
import { getIdToken } from '../../cognito'
import storage from '../../storage'

const UserEmailContext = React.createContext<
  [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
>([undefined, () => {}])

export const useUserEmail = () => React.useContext(UserEmailContext)

export const UserContainer = (props: Object) => {
  const [isStorageLoading, setIsStorageLoading] = React.useState(true)
  const [userEmail, setUserEmail] = React.useState<string | undefined>()

  React.useEffect(
    () =>
      void (async () => {
        try {
          const oldEmail = storage.getEmailOld()
          if (oldEmail) {
            try {
              await storage.setEmail(oldEmail)
            } finally {
              storage.deleteEmailOld()
            }
          }
          setUserEmail(await storage.getEmail())
        } finally {
          setIsStorageLoading(false)
        }
        try {
          const idToken = await getIdToken()
          setUserEmail(idToken.payload.email)
        } catch (e) {
          if (e.message === 'no current user') setUserEmail(undefined)
        }
      })(),
    [],
  )

  React.useEffect(() => {
    if (isStorageLoading) return
    if (!userEmail) storage.deleteEmail()
    else storage.setEmail(userEmail)
  }, [isStorageLoading, userEmail])

  return isStorageLoading ? null : (
    <UserEmailContext.Provider {...props} value={[userEmail, setUserEmail]} />
  )
}
