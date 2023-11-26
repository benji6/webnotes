import { Dialog, Button, Icon } from "eri";

interface Props {
  onClose(): void;
  onConfirm(): void;
  open: boolean;
}

export default function DiscardChangesDialog({
  onClose,
  onConfirm,
  open,
}: Props) {
  return (
    <Dialog onClose={onClose} open={open} title="Discard changes?">
      <p>Your note has unsaved changes.</p>
      <Button.Group>
        <Button danger onClick={onConfirm}>
          <Icon margin="end" name="trash" />
          Discard
        </Button>
        <Button onClick={onClose} variant="secondary">
          <Icon margin="end" name="cross" />
          Cancel
        </Button>
      </Button.Group>
    </Dialog>
  );
}
