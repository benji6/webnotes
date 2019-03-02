import { CardGroup, Spinner } from 'eri'
import * as React from 'react'
import { getNotes } from '../../api'
import Note from '../Note'

interface INote {
  body: string
  dateCreated: string
  userId: string
}

export default function Home() {
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
          notes.map(({ body, dateCreated }) => (
            <Note dateCreated={dateCreated} key={dateCreated}>
              {body}
            </Note>
          ))
        ) : (
          <Spinner variant="page" />
        )}
      </CardGroup>
    </>
  )
}
