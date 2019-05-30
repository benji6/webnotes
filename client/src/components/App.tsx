import { Link } from '@reach/router'
import { Header, MenuButton } from 'eri'
import * as React from 'react'
import { NotesContainer } from './containers/Notes'
import { UserContainer } from './containers/User'
import Main from './Main'
import Menu from './Menu'

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
