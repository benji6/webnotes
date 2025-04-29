import { Dialog, Button, Icon } from "eri";
import { NavigateFunction } from "react-router";
import { DispatchContext } from "../../AppState";
import { use } from "react";

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
  const dispatch = use(DispatchContext);
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
