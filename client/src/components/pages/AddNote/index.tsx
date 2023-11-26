import { Icon, TextArea, Paper, Button } from "eri";
import useNotePlaceholder from "../../hooks/useNotePlaceholder";
import { ClientNote } from "../../../types";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import { DispatchContext } from "../../AppState";
import { ERRORS } from "../../../constants";
import {
  useBeforeUnload,
  useBlocker,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCallback, useContext, useRef, useState } from "react";
import TagComboBox from "../../shared/TagComboBox";
import DiscardNoteDialog from "./DiscardNoteDialog";

export default function AddNote() {
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const placeholder = useNotePlaceholder();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [textAreaError, setTextAreaError] = useState<string | undefined>();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [noteCreated, setNoteCreated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const urlTag = searchParams.get("tag");

  const handleSubmit = async () => {
    const body = textAreaValue.trim();
    if (!body) {
      setHasSubmitted(true);
      setTextAreaError(ERRORS.required);
      return;
    }
    setNoteCreated(true);
    const dateCreated = new Date().toISOString();
    const note: ClientNote = {
      body,
      dateCreated,
      dateUpdated: dateCreated,
      syncState: "created",
    };
    const tag = formRef.current?.tag.value.trim();
    if (tag) note.tag = tag;
    dispatch({ type: "notes/add", payload: note });
    setTimeout(() => navigate(tag ? `/tags/${encodeURIComponent(tag)}` : "/"));
  };

  useKeyboardSave(handleSubmit);

  const shouldShowSaveButton = Boolean(textAreaValue.trim());

  useBeforeUnload(
    useCallback(
      (e) => {
        if (shouldShowSaveButton) e.preventDefault();
      },
      [shouldShowSaveButton],
    ),
  );
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !noteCreated &&
      shouldShowSaveButton &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  return (
    <Paper.Group>
      <Paper>
        <h2>Add note</h2>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          ref={formRef}
        >
          <TagComboBox defaultValue={urlTag || undefined} />
          <TextArea
            autoFocus
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
          {shouldShowSaveButton && (
            <Button.Group>
              <Button onClick={handleSubmit}>
                <Icon margin="end" name="save" />
                Save
              </Button>
            </Button.Group>
          )}
        </form>
        <DiscardNoteDialog
          onClose={() => blocker.reset?.()}
          onConfirm={() => blocker.proceed?.()}
          open={blocker.state === "blocked"}
        />
      </Paper>
    </Paper.Group>
  );
}
