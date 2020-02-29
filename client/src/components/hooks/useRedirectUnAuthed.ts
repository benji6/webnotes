import { navigate } from '@reach/router'
import * as React from 'react'
import { UserStateContext } from '../containers/User'

export default function useRedirectUnAuthed() {
  const { userEmail } = React.useContext(UserStateContext)
  React.useEffect(() => {
    if (!userEmail) navigate('/')
  }, [])
}
