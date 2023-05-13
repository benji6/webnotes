import { Paper, Button } from "eri";
import * as React from "react";
import { StateContext } from "../../AppState";
import { Link, useNavigate } from "react-router-dom";
import NoteList from "./NoteList";

export default function Home() {
  const state = React.useContext(StateContext);
  const navigate = useNavigate();

  return (
    <Paper.Group>
      {state.userEmail ? (
        <NoteList />
      ) : (
        <Paper>
          <h2>Welcome to Webnotes!</h2>
          <p>
            Webnotes is a free and open source web app that lets you create and
            manage notes. It&apos;s simple to use, works offline and because it
            runs in your browser you can use it across all your devices!
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
