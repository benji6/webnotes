import { Nav as EriNav, Button, Icon } from "eri";
import SignOutDialog from "./SignOutDialog";
import { StateContext } from "../AppState";
import SyncState from "./SyncState";
import "./style.css";
import useTags from "../hooks/useTags";
import AppIcon from "../../icons/AppIcon";
import { use, useState } from "react";

interface Props {
  open: boolean;
  handleNavClose(): void;
}

export default function Nav({ handleNavClose, open }: Props) {
  const { userEmail } = use(StateContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const tags = useTags();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    handleNavClose();
  };

  return (
    <>
      <EriNav onClose={handleNavClose} open={open}>
        {userEmail && (
          <div className="w-nav__header">
            <div className="w-profile">
              <AppIcon className="br-max bs-0" />
              <b className="w-profile__state">Signed in</b>
              <em className="w-profile__email" title={userEmail}>
                {userEmail}
              </em>
            </div>
            <div className="w-nav__sign-out center">
              <Button
                danger
                onClick={() => setIsDialogOpen(true)}
                type="button"
                variant="tertiary"
              >
                Sign out
                <Icon name="sign-out" margin="start" />
              </Button>
            </div>
            <hr />
          </div>
        )}
        {userEmail && <SyncState />}
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
              {Boolean(tags.length) && (
                <EriNav.SubList
                  heading={
                    <span>
                      <Icon margin="end" name="menu" />
                      Tags
                    </span>
                  }
                >
                  {tags.map((tag) => (
                    <EriNav.Link
                      key={tag}
                      onClick={handleNavClose}
                      to={`tags/${tag}`}
                    >
                      <Icon margin="end" name="tag" />
                      {tag}
                    </EriNav.Link>
                  ))}
                </EriNav.SubList>
              )}
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
          <EriNav.Link onClick={handleNavClose} to="privacy-policy">
            <Icon margin="end" name="eye" />
            Privacy Policy
          </EriNav.Link>
          <EriNav.Link onClick={handleNavClose} to="see-also">
            <Icon margin="end" name="link" />
            See also
          </EriNav.Link>
        </EriNav.List>
      </EriNav>
      <SignOutDialog onClose={handleDialogClose} open={isDialogOpen} />
    </>
  );
}
