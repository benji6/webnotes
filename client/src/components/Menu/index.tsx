import { Menu as EriMenu, Button } from "eri";
import * as React from "react";
import { Link } from "@reach/router";
import SignOutDialog from "./SignOutDialog";
import { StateContext } from "../AppState";

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
          <>
            <p>
              Signed in as:
              <br />
              {userEmail}
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
        <ul>
          <li>
            <Link onClick={handleMenuClose} to="/">
              Home
            </Link>
          </li>
          {userEmail && (
            <li>
              <Link onClick={handleMenuClose} to="add">
                Add note
              </Link>
            </li>
          )}
          <li>
            <Link onClick={handleMenuClose} to="about">
              About
            </Link>
          </li>
        </ul>
      </EriMenu>
      <SignOutDialog onClose={handleDialogClose} open={isDialogOpen} />
    </>
  );
}
