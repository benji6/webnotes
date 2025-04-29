import { Paper, Card, Fab, Icon } from "eri";
import { StateContext } from "../AppState";
import { Link, useNavigate, useParams } from "react-router";
import Note from "../shared/Note";
import RedirectHome from "../shared/RedirectHome";
import { useNotesByTag } from "../hooks/useNotesByTag";
import { use } from "react";

export default function Tag() {
  const state = use(StateContext);
  const { tag } = useParams();
  const navigate = useNavigate();
  const notesByTag = useNotesByTag();

  const notes = notesByTag.get(tag);
  if (!state.notes || !notes) return <RedirectHome />;

  return (
    <>
      <Paper.Group>
        <Paper>
          <h2>{tag ?? "Untagged notes"}</h2>
          <p>
            <Link to="/">View all notes</Link>
          </p>
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
        <Fab
          aria-label={`add new ${tag} note`}
          onClick={() =>
            navigate(`/add${tag ? `?tag=${encodeURIComponent(tag)}` : ""}`)
          }
        >
          <Icon name="plus" size="4" />
        </Fab>
      </Paper.Group>
    </>
  );
}
