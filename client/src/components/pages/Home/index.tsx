import { Link, RouteComponentProps, NavigateFn } from '@reach/router'
import { CardGroup, Fab, Icon, Spinner } from 'eri'
import * as React from 'react'
import Note from './Note'
import {
  NotesContext,
  NotesLoadingErrorContext,
  UserEmailContext,
} from '../../../contexts'

export default function Home({ navigate }: RouteComponentProps) {
  const userEmail = React.useContext(UserEmailContext)
  const notes = React.useContext(NotesContext)
  const notesLoadingError = React.useContext(NotesLoadingErrorContext)

  return userEmail ? (
    <>
      <h2>Notes</h2>
      <CardGroup>
        {notesLoadingError ? (
          <p>
            Something went wrong, check your internet connection and{' '}
            <a href="/">try again</a>.
          </p>
        ) : !notes ? (
          <Spinner variant="page" />
        ) : notes.length ? (
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
        )}
      </CardGroup>
      <Fab
        aria-label="add new note"
        onClick={() => (navigate as NavigateFn)('add')}
      >
        <Icon name="plus" size="4" />
      </Fab>
    </>
  ) : (
    <>
      <h2>Welcome to Webnotes!</h2>
      <p>
        Webnotes is a free and open source app that lets you create and manage
        notes. It's simple to use and because it runs in your browser you can
        use it across all your devices!
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
