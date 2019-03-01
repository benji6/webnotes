import { Header, ButtonGroup, Button, Spinner } from 'eri'
import * as React from 'react'
import NoteForm from './NoteForm'
import Notes from './Notes'
import SignIn from './SignIn'
import SignUp from './SignUp'
import VerifyUser from './VerifyUser'
import { userPool, getIdToken } from '../cognito'

export default function App() {
  const [userEmail, setUserEmail] = React.useState<string | undefined>(
    undefined,
  )
  const [userDataLoading, setUserDataLoading] = React.useState(true)
  React.useEffect(() => {
    getIdToken().then(
      idToken => {
        setUserEmail(idToken.payload.email)
        setUserDataLoading(false)
      },
      () => setUserDataLoading(false),
    )
  }, [])
  const isSignedIn = Boolean(userEmail)

  return (
    <>
      <Header>
        <h1>Webnotes</h1>
      </Header>
      <main>
        <h2>About</h2>
        <p>A web app for notes that's under construction.</p>
        {userDataLoading ? (
          <Spinner variant="page" />
        ) : isSignedIn ? (
          <>
            <p>Logged in as {userEmail}</p>
            <ButtonGroup>
              <Button
                onClick={() => {
                  const currentUser = userPool.getCurrentUser()
                  if (currentUser) currentUser.signOut()
                  setUserEmail(undefined)
                }}
              >
                Sign out
              </Button>
            </ButtonGroup>
            <NoteForm />
            <Notes />
          </>
        ) : (
          <>
            <SignIn setUserEmail={setUserEmail} />
            <SignUp />
            <VerifyUser />
          </>
        )}
      </main>
    </>
  )
}
