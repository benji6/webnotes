import { Link } from '@reach/router'
import { Header, Spinner, MenuButton } from 'eri'
import * as React from 'react'
import _404 from './pages/_404'
import Menu from './Menu'
import SignIn from './SignIn'
import SignUp from './SignUp'
import VerifyUser from './VerifyUser'
import { getIdToken } from '../cognito'
import NotesContainer from './containers/NotesContainer'
import Router from './Router'

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
    <NotesContainer>
      <Header>
        <h1>
          <Link to="/">Webnotes</Link>
        </h1>
        <MenuButton onClick={handleMenuOpen} />
      </Header>
      <Menu
        handleMenuClose={handleMenuClose}
        open={isMenuOpen}
        setUserEmail={setUserEmail}
        userEmail={userEmail}
      />
      <main>
        {userDataLoading ? (
          <Spinner variant="page" />
        ) : isSignedIn ? (
          <Router />
        ) : (
          <>
            <SignIn setUserEmail={setUserEmail} />
            <SignUp />
            <VerifyUser />
          </>
        )}
      </main>
    </NotesContainer>
  )
}
