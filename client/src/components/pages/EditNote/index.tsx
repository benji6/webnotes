import * as React from "react";
import { Button, Fab, Icon, Paper, TextArea } from "eri";
import DeleteDialog from "./DeleteDialog";
import useNotePlaceholder from "../../hooks/useNotePlaceholder";
import useRedirectUnauthed from "../../hooks/useRedirectUnauthed";
import { ClientNote } from "../../../types";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import { DispatchContext, StateContext } from "../../AppState";
import { ERRORS } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  useRedirectUnauthed();
  const dispatch = React.useContext(DispatchContext);
  const navigate = useNavigate();
  const { dateCreated } = useParams();
  const state = React.useContext(StateContext);
  const note = (state.notes || []).find(
    (note) => note.dateCreated === dateCreated
  );
  if (!note) {
    navigate("/");
    return null;
  }
  const [textAreaValue, setTextAreaValue] = React.useState(note.body);
  const [textAreaError, setTextAreaError] = React.useState<
    string | undefined
  >();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);
  const placeholder = useNotePlaceholder();

  React.useEffect(() => {
    if (!isDirty && note.body !== textAreaValue) setTextAreaValue(note.body);
  }, [isDirty, note.body, textAreaValue]);

  const handleSubmit = async () => {
    const body = textAreaValue.trim();
    if (!body) {
      setHasSubmitted(true);
      setTextAreaError(ERRORS.required);
      return;
    }
    const newNote: ClientNote = {
      body,
      dateCreated: dateCreated as string,
      dateUpdated: new Date().toISOString(),
      syncState: "updated",
    };
    dispatch({ type: "notes/update", payload: newNote });
    navigate("/");
  };

  useKeyboardSave(handleSubmit);

  const dateCreatedObj = new Date(note.dateCreated);
  const dateUpdatedObj = new Date(note.dateUpdated);

  return (
    <Paper.Group>
      <Paper>
        <h2>Edit note</h2>
        <p>
          <small>Created: {dateCreatedObj.toLocaleDateString()}</small>
          {dateCreatedObj.getTime() !== dateUpdatedObj.getTime() && (
            <>
              ,{" "}
              <small>last updated: {dateUpdatedObj.toLocaleDateString()}</small>
            </>
          )}
        </p>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextArea
            error={textAreaError}
            label="Note"
            onChange={({ target: { value } }) => {
              if (!isDirty) setIsDirty(true);
              setTextAreaValue(value);
              if (hasSubmitted) {
                const error = value ? undefined : ERRORS.required;
                if (error !== textAreaError) setTextAreaError(error);
              }
            }}
            placeholder={placeholder}
            rows={14}
            value={textAreaValue}
          />
          <Fab
            aria-label="save"
            hide={!textAreaValue.trim() || textAreaValue.trim() === note.body}
            onClick={handleSubmit}
          >
            <Icon name="save" size="4" />
          </Fab>
        </form>
        <Button.Group>
          <Button
            danger
            onClick={() => setIsDialogOpen(true)}
            type="button"
            variant="secondary"
          >
            Delete
          </Button>
        </Button.Group>
        <DeleteDialog
          dateCreated={dateCreated as string}
          navigate={navigate}
          onClose={() => setIsDialogOpen(false)}
          open={isDialogOpen}
        />
      </Paper>
    </Paper.Group>
  );
}
