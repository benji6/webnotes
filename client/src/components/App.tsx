import { Link, Router } from '@reach/router'
import { Header, ButtonGroup, Button, Spinner, MenuButton, Menu } from 'eri'
import * as React from 'react'
import About from './pages/About'
import AddNote from './pages/AddNote'
import Home from './pages/Home'
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
      <Menu onClose={handleMenuClose} open={isMenuOpen}>
        <ul>
          <li>
            <Link onClick={handleMenuClose} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={handleMenuClose} to="about">
              About
            </Link>
          </li>
          <li>
            <Link onClick={handleMenuClose} to="add">
              Add note
            </Link>
          </li>
        </ul>
      </Menu>
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
