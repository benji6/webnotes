import * as React from "react";
import { getNotes } from "../../../api";
import storage from "../../../storage";
import syncClientToServer from "./syncClientToServer";
import syncServerToClient from "./syncServerToClient";
import useInterval from "../useInterval";
import { StateContext, DispatchContext } from "../../AppState";

export default function useNotes(): void {
  const dispatch = React.useContext(DispatchContext);
  const state = React.useContext(StateContext);
  const [isLoadedFromStorage, setIsLoadedFromStorage] = React.useState(false);

  React.useEffect(
    () =>
      void (async () => {
        try {
          const storedNotes = await storage.getNotes();
          if (storedNotes) {
            dispatch({ type: "notes/set", payload: storedNotes });
          } else {
            dispatch({ type: "notes/clearAll" });
          }
        } finally {
          setIsLoadedFromStorage(true);
        }
      })(),
    []
  );

  React.useEffect(() => {
    if (!isLoadedFromStorage) return;
    if (!state.notes) storage.deleteNotes();
    else storage.setNotes(state.notes);
  }, [isLoadedFromStorage, state.notes]);

  const fetchNotes = () =>
    void (async () => {
      if (!isLoadedFromStorage || !state.userEmail || state.isSyncingFromServer)
        return;
      dispatch({ type: "syncFromServer/start" });
      try {
        const serverNotes = await getNotes();
        if (state.notes) {
          const { notes: newNotes, notesUpdated } = syncServerToClient(
            state.notes,
            serverNotes
          );
          if (notesUpdated) dispatch({ type: "notes/set", payload: newNotes });
        } else {
          dispatch({ type: "notes/set", payload: serverNotes });
        }
        dispatch({ type: "syncFromServer/success" });
      } catch {
        dispatch({ type: "syncFromServer/error" });
      }
    })();

  const updateNotes = () =>
    void (async () => {
      if (
        !isLoadedFromStorage ||
        !state.userEmail ||
        state.isSyncingToServer ||
        !state.notes ||
        !state.notes.some(({ syncState }) => syncState)
      )
        return;
      dispatch({ type: "syncToServer/start" });
      try {
        const newNotes = await syncClientToServer(state.notes);
        dispatch({ type: "notes/set", payload: newNotes });
        dispatch({ type: "syncToServer/success" });
      } catch {
        dispatch({ type: "syncToServer/error" });
      }
    })();

  React.useEffect(fetchNotes, [isLoadedFromStorage, state.userEmail]);
  React.useEffect(updateNotes, [isLoadedFromStorage, state.notes]);
  useInterval(fetchNotes, 6e4);
  useInterval(updateNotes, 1e4);
}
