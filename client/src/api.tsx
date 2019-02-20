import { apiUri } from './constants'

export const getNotes = async () => {
  const response = await fetch(`${apiUri}/notes`)
  return response.json()
}

export const postNote = async (note: { body: string }) => {
  const response = await fetch(`${apiUri}/notes`, {
    body: JSON.stringify(note),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  return response.json()
}
