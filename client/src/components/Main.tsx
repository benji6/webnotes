import * as React from 'react'
import { Spinner } from 'eri'
import { UserLoadingStateContext } from '../contexts'
import Router from './Router'

export default function Main() {
  const userLoadingState = React.useContext(UserLoadingStateContext)

  return (
    <main>
      {userLoadingState === 'error' ? (
        <p>
          Network error, please check your internet connection and try
          refreshing the page
        </p>
      ) : userLoadingState === 'loading' ? (
        <Spinner variant="page" />
      ) : (
        <Router />
      )}
    </main>
  )
}
