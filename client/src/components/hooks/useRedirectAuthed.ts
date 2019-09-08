import { navigate } from '@reach/router'
import * as React from 'react'
import { useUserEmail } from '../containers/User'

export default function useRedirectAuthed() {
  const [userEmail] = useUserEmail()
  React.useEffect(() => {
    if (userEmail) navigate('/')
  }, [])
}
