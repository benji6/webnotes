import { Card, CardGroup, Spinner } from 'eri'
import * as React from 'react'
import { getNotes } from '../api'

interface INote {
  body: string
  date: string
  userId: string
}

export default function Notes() {
  const [notes, setNotes] = React.useState<INote[] | undefined>(undefined)
  React.useEffect(() => {
    getNotes().then((notes: INote[]) =>
      setNotes(
        notes.sort((a, b) => {
          if (a.date > b.date) return 1
          if (a.date < b.date) return -1
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
          notes.map(({ date, body }) => (
            <Card key={date} e-util="pre-line">
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
