import { Button, Icon, Paper, TextArea } from "eri";
import DeleteDialog from "./DeleteDialog";
import useNotePlaceholder from "../../hooks/useNotePlaceholder";
import { ClientNote } from "../../../types";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import { DispatchContext } from "../../AppState";
import { ERRORS } from "../../../constants";
import { useBeforeUnload, useNavigate } from "react-router";
import { useCallback, use, useState } from "react";
import TagComboBox from "../../shared/TagComboBox";

interface Props {
  dateCreated: string;
  note: ClientNote;
}

export default function EditNoteForm({ dateCreated, note }: Props) {
  const dispatch = use(DispatchContext);
  const navigate = useNavigate();

  const [tagValue, setTagValue] = useState(note.tag ?? "");
  const [textAreaValue, setTextAreaValue] = useState(note.body);
  const [textAreaError, setTextAreaError] = useState<string | undefined>();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
      dateCreated: dateCreated,
      dateUpdated: new Date().toISOString(),
      syncState: "updated",
    };
    const tag = tagValue.trim();
    if (tag) newNote.tag = tag;
    dispatch({ type: "notes/update", payload: newNote });
    navigate(tag ? `/tags/${encodeURIComponent(tag)}` : "/");
  };

  useKeyboardSave(handleSubmit);

  const shouldShowSaveButton = Boolean(
    textAreaValue.trim() &&
      (textAreaValue.trim() !== note.body ||
        tagValue.trim() !== (note.tag ?? "")),
  );
  useBeforeUnload(
    useCallback(
      (e) => {
        if (shouldShowSaveButton) e.preventDefault();
      },
      [shouldShowSaveButton],
    ),
  );

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
            stretch
            value={textAreaValue}
          />
          <Button.Group>
            {Boolean(
              textAreaValue.trim() &&
                (textAreaValue.trim() !== note.body ||
                  tagValue.trim() !== (note.tag ?? "")),
            ) && (
              <Button>
                <Icon margin="end" name="save" />
                Save
              </Button>
            )}
            <Button
              danger
              onClick={() => setIsDeleteDialogOpen(true)}
              type="button"
              variant="secondary"
            >
              <Icon margin="end" name="trash" />
              Delete
            </Button>
          </Button.Group>
        </form>
        <DeleteDialog
          dateCreated={dateCreated}
          navigate={() =>
            navigate(note.tag ? `/tags/${encodeURIComponent(note.tag)}` : "/")
          }
          onClose={() => setIsDeleteDialogOpen(false)}
          open={isDeleteDialogOpen}
        />
      </Paper>
    </Paper.Group>
  );
}
