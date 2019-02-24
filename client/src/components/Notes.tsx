import { Card, CardGroup, Spinner } from 'eri'
import * as React from 'react'
import { getNotes } from '../api'

interface INote {
  body: string
  id: string
}

export default function Notes() {
  const [notes, setNotes] = React.useState<INote[] | undefined>(undefined)
  React.useEffect(() => {
    getNotes().then(setNotes)
  }, [])
  return (
    <>
      <h2>Notes</h2>
      <CardGroup>
        {notes ? (
          notes.map(({ id, body }) => (
            <Card key={id} e-util="pre-line">
              {body}
            </Card>
          ))
        ) : (
          <Spinner variant="page" />
        )}
      </CardGroup>
    </>
  )
}
