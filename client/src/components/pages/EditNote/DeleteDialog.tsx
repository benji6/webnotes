import { Dialog, Button, Icon } from "eri";
import * as React from "react";
import { NavigateFunction } from "react-router-dom";
import { DispatchContext } from "../../AppState";

interface Props {
  dateCreated: string;
  navigate: NavigateFunction;
  onClose(): void;
  open: boolean;
}

export default function DeleteDialog({
  dateCreated,
  navigate,
  onClose,
  open,
}: Props) {
  const dispatch = React.useContext(DispatchContext);

  return (
    <Dialog onClose={onClose} open={open} title="Delete note?">
      <Button.Group>
        <Button
          danger
          onClick={() => {
            dispatch({ type: "notes/delete", payload: dateCreated });
            navigate("/");
          }}
        >
          <Icon margin="end" name="trash" />
          Delete
        </Button>
        <Button onClick={onClose} variant="secondary">
          <Icon margin="end" name="cross" />
          Cancel
        </Button>
      </Button.Group>
    </Dialog>
  );
}
