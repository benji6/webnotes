import { apiUri } from './constants'
import { getIdToken } from './cognito'

const getAuthorizationHeader = async () => {
  const idToken = await getIdToken()
  return `Bearer ${idToken.getJwtToken()}`
}

export const getNotes = async () => {
  const Authorization = await getAuthorizationHeader()
  const response = await fetch(`${apiUri}/notes`, {
    headers: { Authorization },
  })
  return response.json()
}

export const postNote = async (note: { body: string }) => {
  const Authorization = await getAuthorizationHeader()
  const response = await fetch(`${apiUri}/notes`, {
    body: JSON.stringify(note),
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  return response.json()
}
