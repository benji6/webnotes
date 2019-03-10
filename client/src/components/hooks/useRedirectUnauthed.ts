import { navigate } from '@reach/router'
import * as React from 'react'
import { UserEmailContext } from '../../contexts'

export default function useRedirectUnauthed() {
  const userEmail = React.useContext(UserEmailContext)
  React.useEffect(() => {
    if (!userEmail) navigate('/')
  }, [])
}
