import { Header, Nav as EriNav } from "eri";
import useUser from "./hooks/useUser";
import Nav from "./Nav";
import useNotes from "./hooks/useNotes";
import { Link, Outlet } from "react-router";
import { useState } from "react";
import { useShuffleBackgroundMesh } from "./hooks/useShuffleBackgroundMesh";
import useAppBadge from "./hooks/useAppBadge";

export default function Layout() {
  useShuffleBackgroundMesh();
  useUser();
  useNotes();
  useAppBadge();
  const [isNavOpen, setIsNavOpen] = useState(false);

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
