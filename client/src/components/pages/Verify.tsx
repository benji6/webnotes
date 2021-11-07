import { RouteComponentProps } from "@reach/router";
import { VerifyPage } from "eri";
import useRedirectAuthed from "../hooks/useRedirectAuthed";

export default function Verify(_: RouteComponentProps) {
  useRedirectAuthed();
  return <VerifyPage appName="Webnotes" />;
}
