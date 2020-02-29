import { NavigateFn } from '@reach/router'
import { Dialog, ButtonGroup, Button } from 'eri'
import * as React from 'react'
import { DispatchContext } from '../../AppState'

interface IProps {
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
}: IProps) {
  const dispatch = React.useContext(DispatchContext)

  return (
    <Dialog onClose={onClose} open={open} title="Delete note?">
      <ButtonGroup>
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
      </ButtonGroup>
    </Dialog>
  )
}
