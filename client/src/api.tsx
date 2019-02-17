import { apiUri } from './constants'

export const getNotes = async () => {
  const response = await fetch(`${apiUri}/notes`)
  return response.json()
}
