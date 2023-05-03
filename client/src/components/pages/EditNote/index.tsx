import { Button, Fab, Icon, Paper, TextArea } from "eri";
import DeleteDialog from "./DeleteDialog";
import useNotePlaceholder from "../../hooks/useNotePlaceholder";
import useRedirectUnauthed from "../../hooks/useRedirectUnauthed";
import { ClientNote } from "../../../types";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import { DispatchContext, StateContext } from "../../AppState";
import { ERRORS } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import TagComboBox from "../../shared/TagComboBox";

export default function EditNote() {
  useRedirectUnauthed();
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const { dateCreated } = useParams();
  const state = useContext(StateContext);
  const note = (state.notes || []).find(
    (note) => note.dateCreated === dateCreated
  );
  if (!note) {
    navigate("/");
    return null;
  }
  const [tagValue, setTagValue] = useState(note.tag);
  const [textAreaValue, setTextAreaValue] = useState(note.body);
  const [textAreaError, setTextAreaError] = useState<string | undefined>();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const placeholder = useNotePlaceholder();

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
    const tag = tagValue?.trim();
    if (tag) newNote.tag = tag;
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
          <TagComboBox
            onChange={({ target: { value } }) => setTagValue(value)}
            value={tagValue}
          />
          <TextArea
            error={textAreaError}
            label="Note"
            onChange={({ target: { value } }) => {
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
