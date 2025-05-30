import { Dialog, Button, Icon } from "eri";
import { useNavigate } from "react-router";
import { userPool } from "../../cognito";
import { DispatchContext, StateContext } from "../AppState";
import { use, useState } from "react";

interface Props {
  onClose(): void;
  open: boolean;
}

export default function SignOutDialog({ onClose, open }: Props) {
  const dispatch = use(DispatchContext);
  const state = use(StateContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    const currentUser = userPool.getCurrentUser();
    if (currentUser) currentUser.signOut();
    onClose();
    dispatch({ type: "notes/clearAll" });
    dispatch({ type: "user/clearEmail" });
    navigate("/");
    setIsLoading(false);
  };

  return (
    <Dialog
      disableClose={isLoading}
      onClose={onClose}
      open={open}
      title="Sign out?"
    >
      {state.notes && state.notes.some(({ syncState }) => syncState) ? (
        <p>
          <strong>
            WARNING: some of your data has not yet been synced to the server and
            will be lost if you sign out now. If you don&apos;t want to lose any
            data please connect to the internet to sync before logging out.
          </strong>
        </p>
      ) : (
        <p>Safe to sign out, all data is synced to the server.</p>
      )}
      <Button.Group>
        <Button danger disabled={isLoading} onClick={handleSignOut}>
          <Icon margin="end" name="sign-out" />
          Sign out
        </Button>
        <Button disabled={isLoading} onClick={onClose} variant="secondary">
          <Icon margin="end" name="cross" />
          Cancel
        </Button>
      </Button.Group>
    </Dialog>
  );
}
