import { NavigateFn } from '@reach/router'
import { Dialog, ButtonGroup, Button } from 'eri'
import * as React from 'react'
import { INoteLocal } from '../../../types'
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
  const [, setNotes] = useNotes()

  const handleDelete = async () => {
    setNotes(notes =>
      (notes as INoteLocal[]).map(note =>
        note.dateCreated === dateCreated
          ? { ...note, syncState: 'deleted' }
          : note,
      ),
    )
    navigate('/')
  }

  return (
    <Dialog onClose={onClose} open={open} title="Delete note?">
      <ButtonGroup>
        <Button danger onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </ButtonGroup>
    </Dialog>
  )
}
