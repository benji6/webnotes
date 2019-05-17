import { NavigateFn } from '@reach/router'
import { Dialog, ButtonGroup, Button } from 'eri'
import * as React from 'react'
import { deleteNote } from '../../../api'
import { INote } from '../../../types'
import { useNotes } from '../../containers/Notes'

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
  const [isLoading, setIsLoading] = React.useState(false)
  const [, setNotes] = useNotes()

  const handleDelete = async () => {
    setIsLoading(true)
    await deleteNote({ dateCreated })
    setNotes(notes =>
      (notes as INote[]).filter(note => note.dateCreated !== dateCreated),
    )
    navigate('/')
  }

  return (
    <Dialog
      disableClose={isLoading}
      onClose={onClose}
      open={open}
      title="Delete note?"
    >
      <ButtonGroup>
        <Button
          disabled={isLoading}
          onClick={handleDelete}
          sentiment="negative"
        >
          Delete
        </Button>
        <Button disabled={isLoading} onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </ButtonGroup>
    </Dialog>
  )
}
