import { Spinner } from "eri";
import * as React from "react";
import Router from "./Router";
import { StateContext } from "./AppState";

export default function Main() {
  const state = React.useContext(StateContext);
  return <main>{state.isUserLoading ? <Spinner /> : <Router />}</main>;
}
