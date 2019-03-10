import { Menu as EriMenu } from 'eri'
import * as React from 'react'
import { Link } from '@reach/router'
import { userPool } from '../cognito'
import { UserEmailContext, SetUserEmailContext } from './contexts'

interface IProps {
  open: boolean
  handleMenuClose(): void
}

export default function Menu({ handleMenuClose, open }: IProps) {
  const userEmail = React.useContext(UserEmailContext)
  const setUserEmail = React.useContext(SetUserEmailContext)

  const handleSignOut = () => {
    const currentUser = userPool.getCurrentUser()
    if (currentUser) currentUser.signOut()
    handleMenuClose()
    setUserEmail(undefined)
  }

  return (
    <EriMenu onClose={handleMenuClose} open={open}>
      {userEmail && (
        <>
          <p>
            Signed in as:
            <br />
            {userEmail}
          </p>
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
        {userEmail && (
          <li>
            <Link onClick={handleSignOut} to="/">
              Sign out
            </Link>
          </li>
        )}
      </ul>
    </EriMenu>
  )
}
