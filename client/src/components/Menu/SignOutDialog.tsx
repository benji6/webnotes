import { navigate } from '@reach/router'
import { Dialog, ButtonGroup, Button } from 'eri'
import * as React from 'react'
import { userPool } from '../../cognito'
import { useNotes } from '../containers/Notes'
import { useUserEmail } from '../containers/User'

interface IProps {
  onClose(): void
  open: boolean
}

export default function SignOutDialog({ onClose, open }: IProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [, setNotes] = useNotes()
  const [, setUserEmail] = useUserEmail()

  const handleSignOut = () => {
    setIsLoading(true)
    const currentUser = userPool.getCurrentUser()
    if (currentUser) currentUser.signOut()
    onClose()
    setNotes(undefined)
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
        <Button danger disabled={isLoading} onClick={handleSignOut}>
          Sign out
        </Button>
        <Button disabled={isLoading} onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </ButtonGroup>
    </Dialog>
  )
}
