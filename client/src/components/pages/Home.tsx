import { CardGroup, Spinner } from 'eri'
import * as React from 'react'
import Note from '../Note'
import { NotesContext } from '../contexts'

export default function Home() {
  const notes = React.useContext(NotesContext)
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
