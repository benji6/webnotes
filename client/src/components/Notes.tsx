import { Card, CardGroup } from 'eri'
import * as React from 'react'
import { getNotes } from '../api'

export default function Notes() {
  const [notes, setNotes] = React.useState([])
  React.useEffect(() => {
    getNotes().then(setNotes)
  })
  return (
    <>
      <h2>Notes</h2>
      <CardGroup>
        {notes.map(({ id, body }) => (
          <Card key={id} e-util="pre-line">
            {body}
          </Card>
        ))}
      </CardGroup>
    </>
  )
}
