import { Menu as EriMenu, Button, ButtonGroup } from 'eri'
import * as React from 'react'
import { Link } from '@reach/router'
import { UserEmailContext } from '../contexts'
import SignOutDialog from './SignOutDialog'

interface IProps {
  open: boolean
  handleMenuClose(): void
}

export default function Menu({ handleMenuClose, open }: IProps) {
  const userEmail = React.useContext(UserEmailContext)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    handleMenuClose()
  }

  return (
    <>
      <EriMenu onClose={handleMenuClose} open={open}>
        {userEmail && (
          <>
            <p>
              Signed in as:
              <br />
              {userEmail}
            </p>
            <ButtonGroup>
              <Button
                onClick={() => setIsDialogOpen(true)}
                sentiment="negative"
                variant="secondary"
              >
                Sign out
              </Button>
            </ButtonGroup>
            <hr />
          </>
        )}
        <ul>
          <li>
            <Link onClick={handleMenuClose} to="/">
              Home
            </Link>
          </li>
          {userEmail && (
            <li>
              <Link onClick={handleMenuClose} to="add">
                Add note
              </Link>
            </li>
          )}
          <li>
            <Link onClick={handleMenuClose} to="about">
              About
            </Link>
          </li>
        </ul>
      </EriMenu>
      <SignOutDialog onClose={handleDialogClose} open={isDialogOpen} />
    </>
  )
}
