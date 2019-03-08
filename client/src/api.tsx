import { apiUri } from './constants'
import { getIdToken } from './cognito'
import { INote } from './types'

const getAuthorizationHeader = async () => {
  const idToken = await getIdToken()
  return `Bearer ${idToken.getJwtToken()}`
}

export const deleteNote = async (body: {
  dateCreated: string
}): Promise<void> => {
  const Authorization = await getAuthorizationHeader()
  await fetch(`${apiUri}/notes`, {
    body: JSON.stringify(body),
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
}
export const getNotes = async (): Promise<INote[]> => {
  const Authorization = await getAuthorizationHeader()
  const response = await fetch(`${apiUri}/notes`, {
    headers: { Authorization },
  })
  return response.json()
}

export const postNote = async (note: { body: string }): Promise<INote> => {
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

export const putNote = async (note: {
  body: string
  dateCreated: string
}): Promise<INote> => {
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
