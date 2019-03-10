import { NavigateFn } from '@reach/router'
import { Card } from 'eri'
import * as React from 'react'

interface IProps {
  children: string
  dateCreated: string
  navigate: NavigateFn
}

export default function Note({ children, dateCreated, navigate }: IProps) {
  return (
    <Card onClick={() => navigate(`edit/${dateCreated}`)}>
      <p>{children.split(/[\r\n]+/, 1)[0]}</p>
    </Card>
  )
}
