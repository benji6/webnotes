import { Menu as EriMenu, Button, Icon, Spinner } from "eri";
import * as React from "react";
import SignOutDialog from "./SignOutDialog";
import { StateContext } from "../AppState";

interface Props {
  open: boolean;
  handleMenuClose(): void;
}

export default function Menu({ handleMenuClose, open }: Props) {
  const {
    isSyncingFromServer,
    isSyncingToServer,
    userEmail,
  } = React.useContext(StateContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    handleMenuClose();
  };

  return (
    <>
      <EriMenu onClose={handleMenuClose} open={open}>
        {userEmail && (
          <>
            <strong>Signed in</strong>
            <p>
              <em>{userEmail}</em>
            </p>
            <Button.Group>
              <Button
                danger
                onClick={() => setIsDialogOpen(true)}
                variant="secondary"
              >
                Sign out
              </Button>
            </Button.Group>
            <hr />
          </>
        )}
        <EriMenu.List>
          <EriMenu.Link onClick={handleMenuClose} to="/">
            Home
          </EriMenu.Link>
          {userEmail && (
            <EriMenu.Link onClick={handleMenuClose} to="add">
              Add note
            </EriMenu.Link>
          )}
          <EriMenu.Link onClick={handleMenuClose} to="about">
            About
          </EriMenu.Link>
        </EriMenu.List>
        <hr />
        <p e-util="center">
          {isSyncingFromServer ? (
            isSyncingToServer ? (
              <>
                Syncing <Spinner inline />
              </>
            ) : (
              <>
                Syncing from server <Spinner inline />
              </>
            )
          ) : isSyncingToServer ? (
            <>
              Syncing to server <Spinner inline />
            </>
          ) : (
            <>
              Synced with server <Icon draw name="check" />
            </>
          )}
        </p>
      </EriMenu>
      <SignOutDialog onClose={handleDialogClose} open={isDialogOpen} />
    </>
  );
}
