import { Dialog, Button, Icon } from "eri";

interface Props {
  onClose(): void;
  onConfirm(): void;
  open: boolean;
}

export default function DiscardNoteDialog({ onClose, onConfirm, open }: Props) {
  return (
    <Dialog onClose={onClose} open={open} title="Discard note?">
      <p>Your note will not be saved.</p>
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
