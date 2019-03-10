import * as React from 'react'
import { Spinner } from 'eri'
import { UserLoadingContext, UserEmailContext } from './contexts'
import NotesContainer from './containers/NotesContainer'
import Router from './Router'
import SignIn from './SignIn'
import VerifyUser from './VerifyUser'
import SignUp from './SignUp'

export default function Main() {
  const userLoading = React.useContext(UserLoadingContext)
  const userEmail = React.useContext(UserEmailContext)

  return (
    <main>
      {userLoading ? (
        <Spinner variant="page" />
      ) : userEmail ? (
        <NotesContainer>
          <Router />
        </NotesContainer>
      ) : (
        <>
          <SignIn />
          <SignUp />
          <VerifyUser />
        </>
      )}
    </main>
  )
}
