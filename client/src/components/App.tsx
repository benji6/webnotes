import { Link } from "@reach/router";
import { Header, Menu as EriMenu } from "eri";
import * as React from "react";
import useUser from "./hooks/useUser";
import Main from "./Main";
import Menu from "./Menu";
import useNotes from "./hooks/useNotes";

export default function App() {
  useUser();
  useNotes();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <Header>
        <h1>
          <Link to="/">Webnotes</Link>
        </h1>
        <EriMenu.Button onClick={() => setIsMenuOpen(true)} />
      </Header>
      <Menu handleMenuClose={() => setIsMenuOpen(false)} open={isMenuOpen} />
      <Main />
    </>
  );
}
