import { Spinner } from "eri";
import * as React from "react";
import Routes from "./Routes";
import { StateContext } from "./AppState";

export default function Main() {
  const state = React.useContext(StateContext);
  return <main>{state.isUserLoading ? <Spinner /> : <Routes />}</main>;
}
