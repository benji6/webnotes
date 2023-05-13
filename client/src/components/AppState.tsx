import * as React from "react";
import { ClientNote } from "../types";

type FluxStandardAction<
  Type extends string,
  Payload = undefined
> = Payload extends undefined
  ? { type: Type }
  : { payload: Payload; type: Type };

type Action =
  | FluxStandardAction<"notes/add", ClientNote>
  | FluxStandardAction<"notes/clearAll">
  | FluxStandardAction<"notes/delete", string>
  | FluxStandardAction<"notes/loadedFromStorage">
  | FluxStandardAction<"notes/set", ClientNote[]>
  | FluxStandardAction<"notes/update", ClientNote>
  | FluxStandardAction<"storage/finishedLoading">
  | FluxStandardAction<"syncFromServer/error">
  | FluxStandardAction<"syncFromServer/start">
  | FluxStandardAction<"syncFromServer/success">
  | FluxStandardAction<"syncToServer/error">
  | FluxStandardAction<"syncToServer/start">
  | FluxStandardAction<"syncToServer/success">
  | FluxStandardAction<"user/clearEmail">
  | FluxStandardAction<"user/setEmail", string>;

interface State {
  isNotesLoading: boolean;
  isSyncingFromServer: boolean;
  isSyncingToServer: boolean;
  isUserLoading: boolean;
  notes: ClientNote[] | undefined;
  syncFromServerError: boolean;
  syncToServerError: boolean;
  userEmail: string | undefined;
}

const initialState: State = {
  isNotesLoading: true,
  isSyncingFromServer: false,
  isSyncingToServer: false,
  isUserLoading: true,
  notes: undefined,
  syncFromServerError: false,
  syncToServerError: false,
  userEmail: undefined,
};

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => undefined
);
export const StateContext = React.createContext<State>(initialState);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "notes/add":
      return {
        ...state,
        notes: state.notes
          ? [action.payload, ...state.notes]
          : [action.payload],
      };
    case "notes/clearAll":
      return { ...state, notes: undefined };
    case "notes/delete":
      if (!state.notes) return state;
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.dateCreated === action.payload
            ? { ...note, syncState: "deleted" }
            : note
        ),
      };
    case "notes/loadedFromStorage":
      return { ...state, isNotesLoading: false };
    case "notes/set":
      return { ...state, notes: action.payload };
    case "notes/update": {
      if (!state.notes) return { ...state, notes: [action.payload] };
      const index = state.notes.findIndex(
        ({ dateCreated }) => action.payload.dateCreated === dateCreated
      );
      return {
        ...state,
        notes: [
          action.payload,
          ...state.notes.slice(0, index),
          ...state.notes.slice(index + 1),
        ],
      };
    }
    case "storage/finishedLoading":
      return { ...state, isUserLoading: false };
    case "syncFromServer/error":
      return {
        ...state,
        isSyncingFromServer: false,
        syncFromServerError: true,
      };
    case "syncFromServer/start":
      return {
        ...state,
        isSyncingFromServer: true,
        syncFromServerError: false,
      };
    case "syncFromServer/success":
      return {
        ...state,
        isSyncingFromServer: false,
        syncFromServerError: false,
      };
    case "syncToServer/error":
      return { ...state, isSyncingToServer: false, syncToServerError: true };
    case "syncToServer/start":
      return { ...state, isSyncingToServer: true, syncToServerError: false };
    case "syncToServer/success":
      return {
        ...state,
        isSyncingToServer: false,
        syncToServerError: false,
      };
    case "user/clearEmail":
      return { ...state, userEmail: undefined };
    case "user/setEmail":
      return { ...state, userEmail: action.payload };
  }
};

export default function AppState({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}
