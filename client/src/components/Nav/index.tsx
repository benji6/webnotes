import { Nav as EriNav, Button, Icon } from "eri";
import * as React from "react";
import SignOutDialog from "./SignOutDialog";
import { StateContext } from "../AppState";
import SyncState from "./SyncState";
import "./style.css";

interface Props {
  open: boolean;
  handleNavClose(): void;
}

export default function Nav({ handleNavClose, open }: Props) {
  const { userEmail } = React.useContext(StateContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    handleNavClose();
  };

  return (
    <>
      <EriNav onClose={handleNavClose} open={open}>
        {userEmail && (
          <div className="w-nav__header">
            <strong>Signed in</strong>
            <p>
              <em>{userEmail}</em>
            </p>
            <Button.Group>
              <Button
                danger
                onClick={() => setIsDialogOpen(true)}
                variant="tertiary"
              >
                Sign out
                <Icon name="sign-out" margin="start" />
              </Button>
            </Button.Group>
            <hr />
          </div>
        )}
        <EriNav.List>
          <EriNav.Link onClick={handleNavClose} to="/">
            <Icon margin="end" name="home" />
            Home
          </EriNav.Link>
          {userEmail && (
            <>
              <EriNav.Link onClick={handleNavClose} to="add">
                <Icon margin="end" name="plus" />
                Add note
              </EriNav.Link>
              <EriNav.Link onClick={handleNavClose} to="/change-password">
                <Icon margin="end" name="lock" />
                Change password
              </EriNav.Link>
            </>
          )}
          <EriNav.Link onClick={handleNavClose} to="about">
            <Icon margin="end" name="help" />
            About
          </EriNav.Link>
          <EriNav.Link onClick={handleNavClose} to="see-also">
            <Icon margin="end" name="link" />
            See also
          </EriNav.Link>
        </EriNav.List>
        {userEmail && <SyncState />}
      </EriNav>
      <SignOutDialog onClose={handleDialogClose} open={isDialogOpen} />
    </>
  );
}
