import { apiUri } from './constants'
import { getIdToken } from './cognito'

const getAuthorizationHeader = async () => {
  const idToken = await getIdToken()
  return `Bearer ${idToken.getJwtToken()}`
}

export const deleteNote = async (body: { dateCreated: string }) => {
  const Authorization = await getAuthorizationHeader()
  return fetch(`${apiUri}/notes`, {
    body: JSON.stringify(body),
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
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

export const putNote = async (note: { body: string; dateCreated: string }) => {
  const Authorization = await getAuthorizationHeader()
  const response = await fetch(`${apiUri}/notes`, {
    body: JSON.stringify(note),
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })
  return response.json()
}
