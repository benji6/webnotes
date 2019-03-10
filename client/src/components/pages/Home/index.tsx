import { Link, RouteComponentProps, NavigateFn } from '@reach/router'
import { CardGroup, Spinner } from 'eri'
import * as React from 'react'
import Note from './Note'
import { NotesContext, UserEmailContext } from '../../../contexts'

export default function Home({ navigate }: RouteComponentProps) {
  const userEmail = React.useContext(UserEmailContext)
  const notes = React.useContext(NotesContext)
  return userEmail ? (
    <>
      <h2>Notes</h2>
      <CardGroup>
        {notes ? (
          notes.length ? (
            notes.map(({ body, dateCreated }) => (
              <Note
                dateCreated={dateCreated}
                key={dateCreated}
                navigate={navigate as NavigateFn}
              >
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
  ) : (
    <>
      <h2>Welcome to Webnotes!</h2>
      <p>
        Webnotes is a free app that helps you manage your notes. It works across
        all your devices, is easy to use and is safe and secure.
      </p>
      <br />
      <p e-util="center">
        <strong>
          <Link to="sign-up">Sign up now to get started!</Link>
        </strong>
      </p>
      <br />
      <p>
        <small>
          If you already have an account you can{' '}
          <Link to="sign-in">sign in here</Link>.
        </small>
      </p>
    </>
  )
}
