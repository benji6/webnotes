import { Card, ButtonGroup, Button } from 'eri'
import * as React from 'react'
import { deleteNote } from '../api'

interface IProps {
  children: string
  dateCreated: string
}

export default function Note({ children, dateCreated }: IProps) {
  const handleDelete = () => deleteNote({ dateCreated })

  return (
    <Card e-util="pre-line">
      {children}
      <ButtonGroup>
        <Button onClick={handleDelete} sentiment="negative">
          Delete
        </Button>
      </ButtonGroup>
    </Card>
  )
}
