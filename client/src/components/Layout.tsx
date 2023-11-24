import { Header, Nav as EriNav } from "eri";
import * as React from "react";
import useUser from "./hooks/useUser";
import Nav from "./Nav";
import useNotes from "./hooks/useNotes";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  useUser();
  useNotes();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  return (
    <>
      <Header>
        <h1>
          <Link to="/">Webnotes</Link>
        </h1>
        <EriNav.Button onClick={() => setIsNavOpen(true)} />
      </Header>
      <Nav handleNavClose={() => setIsNavOpen(false)} open={isNavOpen} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
