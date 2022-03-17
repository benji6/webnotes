import { VerifyPage } from "eri";
import useRedirectAuthed from "../hooks/useRedirectAuthed";

export default function Verify() {
  useRedirectAuthed();
  return <VerifyPage appName="Webnotes" />;
}
