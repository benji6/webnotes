import { StateContext } from "../../AppState";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import RedirectHome from "../../shared/RedirectHome";
import EditNoteForm from "./EditNoteForm";

export default function EditNote() {
  const state = useContext(StateContext);
  const { dateCreated } = useParams();
  const note = (state.notes || []).find(
    (note) => note.dateCreated === dateCreated,
  );
  return note && dateCreated ? (
    <EditNoteForm dateCreated={dateCreated} note={note} />
  ) : (
    <RedirectHome />
  );
}
