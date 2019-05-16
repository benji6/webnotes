import * as React from 'react'
import { UserLoadingErrorContext } from '../contexts'
import Router from './Router'

export default function Main() {
  const userLoadingError = React.useContext(UserLoadingErrorContext)

  return (
    <main>
      {userLoadingError ? (
        <p>
          Something went wrong, check your internet connection and{' '}
          <a href="/">try again</a>.
        </p>
      ) : (
        <Router />
      )}
    </main>
  )
}
