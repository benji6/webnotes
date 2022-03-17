import { Card, Fab, Icon, Spinner, Paper, Button } from "eri";
import * as React from "react";
import Note from "./Note";
import { StateContext } from "../../AppState";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const state = React.useContext(StateContext);
  const navigate = useNavigate();

  return (
    <Paper.Group>
      {state.userEmail ? (
        <Paper>
          <h2>Notes</h2>
          {!state.notes ? (
            <Spinner />
          ) : state.notes.length ? (
            <Card.Group>
              {state.notes
                .filter(({ syncState }) => syncState !== "deleted")
                .map(({ body, dateCreated }) => (
                  <Note
                    dateCreated={dateCreated}
                    key={dateCreated}
                    navigate={navigate}
                  >
                    {body}
                  </Note>
                ))}
            </Card.Group>
          ) : (
            <>
              <p>You have no notes!</p>
              <p>
                <Link to="add">Click here to add your first one</Link>
              </p>
            </>
          )}
          <Fab aria-label="add new note" onClick={() => navigate("add")}>
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
          <Button.Group>
            <Button onClick={() => navigate("/sign-up")} type="button">
              Sign up now to get started!
            </Button>
          </Button.Group>
          <p>
            <small>
              If you already have an account you can{" "}
              <Link to="sign-in">sign in here</Link>.
            </small>
          </p>
        </Paper>
      )}
    </Paper.Group>
  );
}
