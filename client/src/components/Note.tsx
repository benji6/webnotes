import { Card, Button, ButtonGroup } from 'eri'
import * as React from 'react'
import { deleteNote } from '../api'
import { Link } from '@reach/router'

interface IProps {
  children: string
  dateCreated: string
}

export default function Note({ children, dateCreated }: IProps) {
  const handleDelete = () => deleteNote({ dateCreated })

  return (
    <Card e-util="pre-line">
      <p>{children}</p>
      <ButtonGroup>
        <Link to={`edit/${dateCreated}`}>Edit</Link>
        <Button onClick={handleDelete} sentiment="negative">
          Delete
        </Button>
      </ButtonGroup>
    </Card>
  )
}
