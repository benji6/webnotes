import { Link } from '@reach/router'
import { Header, MenuButton } from 'eri'
import * as React from 'react'
import _404 from './pages/_404'
import Menu from './Menu'
import UserContainer from './containers/UserContainer'
import Main from './Main'
import NotesContainer from './containers/NotesContainer'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleMenuClose = () => setIsMenuOpen(false)
  const handleMenuOpen = () => setIsMenuOpen(true)

  return (
    <UserContainer>
      <NotesContainer>
        <Header>
          <h1>
            <Link to="/">Webnotes</Link>
          </h1>
          <MenuButton onClick={handleMenuOpen} />
        </Header>
        <Menu handleMenuClose={handleMenuClose} open={isMenuOpen} />
        <Main />
      </NotesContainer>
    </UserContainer>
  )
}
