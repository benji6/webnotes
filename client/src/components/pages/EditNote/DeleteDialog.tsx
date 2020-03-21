import { NavigateFn } from '@reach/router'
import { Dialog, Button } from 'eri'
import * as React from 'react'
import { DispatchContext } from '../../AppState'

interface Props {
  dateCreated: string
  navigate: NavigateFn
  onClose(): void
  open: boolean
}

export default function DeleteDialog({
  dateCreated,
  navigate,
  onClose,
  open,
}: Props) {
  const dispatch = React.useContext(DispatchContext)

  return (
    <Dialog onClose={onClose} open={open} title="Delete note?">
      <Button.Group>
        <Button
          danger
          onClick={() => {
            dispatch({ type: 'notes/delete', payload: dateCreated })
            navigate('/')
          }}
        >
          Delete
        </Button>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </Button.Group>
    </Dialog>
  )
}
