import * as React from "react";
import { Fab, Icon, TextArea, Paper } from "eri";
import useRedirectUnauthed from "../hooks/useRedirectUnauthed";
import useNotePlaceholder from "../hooks/useNotePlaceholder";
import { ClientNote } from "../../types";
import useKeyboardSave from "../hooks/useKeyboardSave";
import { DispatchContext } from "../AppState";
import { ERRORS } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  useRedirectUnauthed();
  const dispatch = React.useContext(DispatchContext);
  const navigate = useNavigate();
  const placeholder = useNotePlaceholder();
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [textAreaError, setTextAreaError] = React.useState<
    string | undefined
  >();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const handleSubmit = async () => {
    const body = textAreaValue.trim();
    if (!body) {
      setHasSubmitted(true);
      setTextAreaError(ERRORS.required);
      return;
    }
    const dateCreated = new Date().toISOString();
    const note: ClientNote = {
      body,
      dateCreated,
      dateUpdated: dateCreated,
      syncState: "created",
    };
    dispatch({ type: "notes/add", payload: note });
    navigate("/");
  };

  useKeyboardSave(handleSubmit);

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
        >
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
          <Fab
            aria-label="save"
            hide={!textAreaValue.trim()}
            onClick={handleSubmit}
          >
            <Icon name="save" size="4" />
          </Fab>
        </form>
      </Paper>
    </Paper.Group>
  );
}
