import { Card } from 'eri'
import * as React from 'react'

interface IProps {
  children: string
}

export default function Note({ children }: IProps) {
  return <Card e-util="pre-line">{children}</Card>
}
