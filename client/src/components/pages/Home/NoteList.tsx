import { Card, Fab, Icon, Spinner, Paper } from "eri";
import * as React from "react";
import Note from "./Note";
import { StateContext } from "../../AppState";
import { Link, useNavigate } from "react-router-dom";
import { ClientNote } from "../../../types";

export default function NoteList() {
  const state = React.useContext(StateContext);
  const navigate = useNavigate();

  const notesByTag = new Map<string | undefined, ClientNote[]>();
  if (state.notes)
    for (const note of state.notes) {
      if (note.syncState === "deleted") continue;
      const tagNotes = notesByTag.get(note.tag);
      if (tagNotes) tagNotes.push(note);
      else notesByTag.set(note.tag, [note]);
    }
  const sortedNotes = [...notesByTag.entries()].sort(([a], [b]) => {
    if (a === undefined) return -1;
    if (b === undefined) return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      {!state.notes ? (
        <Paper>
          <h2>Notes</h2>
          <Spinner />
        </Paper>
      ) : state.notes.length ? (
        sortedNotes.map(([tag, notes]) => (
          <Paper key={tag ?? 0}>
            <h2>{tag ?? "Unlabeled notes"}</h2>
            <Card.Group>
              {notes.map(({ body, dateCreated }) => (
                <Note
                  dateCreated={dateCreated}
                  key={dateCreated}
                  navigate={navigate}
                >
                  {body}
                </Note>
              ))}
            </Card.Group>
          </Paper>
        ))
      ) : (
        <Paper>
          <h2>Notes</h2>
          <p>You have no notes!</p>
          <p>
            <Link to="add">Click here to add your first one</Link>
          </p>
        </Paper>
      )}
      <Fab aria-label="add new note" onClick={() => navigate("add")}>
        <Icon name="plus" size="4" />
      </Fab>
    </>
  );
}
