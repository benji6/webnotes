import { Dialog, ButtonGroup, Button } from 'eri'
import * as React from 'react'
import { SetUserEmailContext } from '../contexts'
import { userPool } from '../../cognito'
import { navigate } from '@reach/router'

interface IProps {
  onClose(): void
  open: boolean
}

export default function SignOutDialog({ onClose, open }: IProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const setUserEmail = React.useContext(SetUserEmailContext)

  const handleSignOut = () => {
    setIsLoading(true)
    const currentUser = userPool.getCurrentUser()
    if (currentUser) currentUser.signOut()
    onClose()
    setUserEmail(undefined)
    navigate('/')
    setIsLoading(false)
  }

  return (
    <Dialog
      disableClose={isLoading}
      onClose={onClose}
      open={open}
      title="Sign out?"
    >
      <ButtonGroup>
        <Button
          disabled={isLoading}
          onClick={handleSignOut}
          sentiment="negative"
        >
          Sign out
        </Button>
        <Button disabled={isLoading} onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </ButtonGroup>
    </Dialog>
  )
}
