import { Link, RouteComponentProps, NavigateFn } from '@reach/router'
import { Card, Fab, Icon, Spinner, Paper } from 'eri'
import * as React from 'react'
import Note from './Note'
import { StateContext } from '../../AppState'

export default function Home({ navigate }: RouteComponentProps) {
  const state = React.useContext(StateContext)

  return (
    <Paper.Group>
      {state.userEmail ? (
        <Paper>
          <h2>Notes</h2>
          <Card.Group>
            {!state.notes ? (
              <Spinner />
            ) : state.notes.length ? (
              state.notes
                .filter(({ syncState }) => syncState !== 'deleted')
                .map(({ body, dateCreated }) => (
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
          </Card.Group>
          <Fab
            aria-label="add new note"
            onClick={() => (navigate as NavigateFn)('add')}
          >
            <Icon name="plus" size="4" />
          </Fab>
        </Paper>
      ) : (
        <Paper>
          <h2>Welcome to Webnotes!</h2>
          <p>
            Webnotes is a free and open source web app that lets you create and
            manage notes. It's simple to use, works offline and because it runs
            in your browser you can use it across all your devices!
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
        </Paper>
      )}
    </Paper.Group>
  )
}
