import { Link, RouteComponentProps } from '@reach/router'
import { CardGroup, Spinner } from 'eri'
import * as React from 'react'
import Note from '../Note'
import { NotesContext } from '../contexts'

export default function Home(_: RouteComponentProps) {
  const notes = React.useContext(NotesContext)
  return (
    <>
      <h2>Notes</h2>
      <CardGroup>
        {notes ? (
          notes.length ? (
            notes.map(({ body, dateCreated }) => (
              <Note dateCreated={dateCreated} key={dateCreated}>
                {body}
              </Note>
            ))
          ) : (
            <div>
              <p>You have no notes!</p>
              <p>
                <Link to="add">Click here to add your first one</Link>
              </p>
            </div>
          )
        ) : (
          <Spinner variant="page" />
        )}
      </CardGroup>
    </>
  )
}
