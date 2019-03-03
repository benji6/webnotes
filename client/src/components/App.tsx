import { Link, Router } from '@reach/router'
import { Header, ButtonGroup, Button, Spinner, MenuButton } from 'eri'
import * as React from 'react'
import _404 from './pages/_404'
import About from './pages/About'
import AddNote from './pages/AddNote'
import Home from './pages/Home'
import Menu from './Menu'
import SignIn from './SignIn'
import SignUp from './SignUp'
import VerifyUser from './VerifyUser'
import { userPool, getIdToken } from '../cognito'

export default function App() {
  const [userEmail, setUserEmail] = React.useState<string | undefined>(
    undefined,
  )
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
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
  const handleMenuClose = () => setIsMenuOpen(false)
  const handleMenuOpen = () => setIsMenuOpen(true)

  return (
    <>
      <Header>
        <h1>
          <Link to="/">Webnotes</Link>
        </h1>
        <MenuButton onClick={handleMenuOpen} />
      </Header>
      <Menu handleMenuClose={handleMenuClose} open={isMenuOpen} />
      <main>
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
            <Router>
              <_404 default />
              <Home path="/" />
              <About path="about" />
              <AddNote path="add" />
            </Router>
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
