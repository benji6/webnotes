import { ButtonGroup, Card } from 'eri'
import * as React from 'react'
import { Link } from '@reach/router'

interface IProps {
  children: string
  dateCreated: string
}

export default function Note({ children, dateCreated }: IProps) {
  return (
    <Card e-util="pre-line">
      <p>{children}</p>
      <ButtonGroup>
        <Link to={`edit/${dateCreated}`}>Edit</Link>
      </ButtonGroup>
    </Card>
  )
}
