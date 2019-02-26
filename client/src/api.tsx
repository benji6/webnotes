import { apiUri } from './constants'
import { getIdToken } from './cognito'

export const getNotes = async () => {
  const response = await fetch(`${apiUri}/notes`)
  return response.json()
}

export const postNote = (note: { body: string }) =>
  new Promise(async (resolve, reject) => {
    const idToken = await getIdToken()
    const response = await fetch(`${apiUri}/notes`, {
      body: JSON.stringify(note),
      headers: {
        Authorization: `Bearer ${idToken.getJwtToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    resolve(response.json())
  })
