import { Card, CardGroup, Spinner } from 'eri'
import * as React from 'react'
import { getNotes } from '../api'

interface INote {
  body: string
  dateCreated: string
  userId: string
}

export default function Notes() {
  const [notes, setNotes] = React.useState<INote[] | undefined>(undefined)
  React.useEffect(() => {
    getNotes().then((notes: INote[]) =>
      setNotes(
        notes.sort((a, b) => {
          if (a.dateCreated > b.dateCreated) return 1
          if (a.dateCreated < b.dateCreated) return -1
          return 0
        }),
      ),
    )
  }, [])
  return (
    <>
      <h2>Notes</h2>
      <CardGroup>
        {notes ? (
          notes.map(({ dateCreated, body }) => (
            <Card key={dateCreated} e-util="pre-line">
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
