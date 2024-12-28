import { getNotes } from "../../../api";
import storage from "../../../storage";
import syncClientToServer from "./syncClientToServer";
import syncServerToClient from "./syncServerToClient";
import useInterval from "../useInterval";
import { StateContext, DispatchContext } from "../../AppState";
import { use, useEffect } from "react";

export default function useNotes(): void {
  const state = use(StateContext);
  const dispatch = use(DispatchContext);

  useEffect(
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
          dispatch({ type: "notes/loadedFromStorage" });
        }
      })(),
    [],
  );

  useEffect(() => {
    if (state.isNotesLoading) return;
    if (!state.notes) storage.deleteNotes();
    else storage.setNotes(state.notes);
  }, [state.isNotesLoading, state.notes]);

  const fetchNotes = () =>
    void (async () => {
      if (state.isNotesLoading || !state.userEmail || state.isSyncingFromServer)
        return;
      dispatch({ type: "syncFromServer/start" });
      try {
        const serverNotes = await getNotes();
        if (state.notes) {
          const { notes: newNotes, notesUpdated } = syncServerToClient(
            state.notes,
            serverNotes,
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
        state.isNotesLoading ||
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

  useEffect(fetchNotes, [state.isNotesLoading, state.userEmail]);
  useEffect(updateNotes, [
    dispatch,
    state.isNotesLoading,
    state.isSyncingToServer,
    state.notes,
    state.userEmail,
  ]);
  useInterval(fetchNotes, 6e4);
  useInterval(updateNotes, 1e4);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchNotes();
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });
}
