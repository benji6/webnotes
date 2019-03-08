import { Card, Button, ButtonGroup } from 'eri'
import * as React from 'react'
import { deleteNote } from '../api'
import { Link } from '@reach/router'
import { SetNotesContext } from './contexts'
import { INote } from '../types'

interface IProps {
  children: string
  dateCreated: string
}

export default function Note({ children, dateCreated }: IProps) {
  const [isDeleting, setIsDeleting] = React.useState(false)
  const setNotes = React.useContext(SetNotesContext)
  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteNote({ dateCreated })
    setNotes((notes: INote[]) =>
      notes.filter(note => note.dateCreated !== dateCreated),
    )
  }

  return (
    <Card e-util="pre-line">
      <p>{children}</p>
      <ButtonGroup>
        <Link to={`edit/${dateCreated}`}>Edit</Link>
        <Button
          disabled={isDeleting}
          onClick={handleDelete}
          sentiment="negative"
          variant="secondary"
        >
          Delete
        </Button>
      </ButtonGroup>
    </Card>
  )
}
