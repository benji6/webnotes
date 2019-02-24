import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { apiUri, userPool } from './constants'

export const getNotes = async () => {
  const response = await fetch(`${apiUri}/notes`)
  return response.json()
}

export const postNote = (note: { body: string }) =>
  new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser()
    if (!currentUser) return reject(Error('no current user'))
    currentUser.getSession(
      async (err: Error | void, session: CognitoUserSession) => {
        if (err) return reject(err)
        if (!session.isValid()) return reject(Error('session is not valid'))
        const response = await fetch(`${apiUri}/notes`, {
          body: JSON.stringify(note),
          headers: {
            Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        resolve(response.json())
      },
    )
  })
