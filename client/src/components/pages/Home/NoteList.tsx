import { Card, Fab, Icon, Spinner, Paper } from "eri";
import * as React from "react";
import { StateContext } from "../../AppState";
import { Link, useNavigate } from "react-router-dom";
import Note from "../../shared/Note";
import { useNotesByTag } from "../../hooks/useNotesByTag";

export default function NoteList() {
  const state = React.useContext(StateContext);
  const navigate = useNavigate();

  const notesByTag = useNotesByTag();
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
      ) : sortedNotes.length ? (
        <>
          <Paper>
            <h2>All notes</h2>
          </Paper>
          {sortedNotes.map(([tag, notes]) => (
            <Paper key={tag ?? 0}>
              <h3>
                <Link to={`tags/${tag ? encodeURIComponent(tag) : ""}`}>
                  {tag ?? "Untagged notes"}
                </Link>
              </h3>
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
          ))}
        </>
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
