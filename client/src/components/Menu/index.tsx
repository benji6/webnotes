import { Menu as EriMenu, Button, Icon } from "eri";
import * as React from "react";
import SignOutDialog from "./SignOutDialog";
import { StateContext } from "../AppState";
import SyncState from "./SyncState";
import "./style.css";

interface Props {
  open: boolean;
  handleMenuClose(): void;
}

export default function Menu({ handleMenuClose, open }: Props) {
  const { userEmail } = React.useContext(StateContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    handleMenuClose();
  };

  return (
    <>
      <EriMenu onClose={handleMenuClose} open={open}>
        {userEmail && (
          <div className="w-menu__header">
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
          </div>
        )}
        <EriMenu.List>
          <EriMenu.Link onClick={handleMenuClose} to="/">
            <Icon margin="right" name="home" />
            Home
          </EriMenu.Link>
          {userEmail && (
            <>
              <EriMenu.Link onClick={handleMenuClose} to="add">
                <Icon margin="right" name="plus" />
                Add note
              </EriMenu.Link>
              <EriMenu.Link onClick={handleMenuClose} to="/change-password">
                <Icon margin="right" name="lock" />
                Change password
              </EriMenu.Link>
            </>
          )}
          <EriMenu.Link onClick={handleMenuClose} to="about">
            <Icon margin="right" name="help" />
            About
          </EriMenu.Link>
          <EriMenu.Link onClick={handleMenuClose} to="see-also">
            <Icon margin="right" name="link" />
            See also
          </EriMenu.Link>
        </EriMenu.List>
        {userEmail && <SyncState />}
      </EriMenu>
      <SignOutDialog onClose={handleDialogClose} open={isDialogOpen} />
    </>
  );
}
