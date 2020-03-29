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
  | FluxStandardAction<"notes/finishedLoading">
  | FluxStandardAction<"notes/set", ClientNote[]>
  | FluxStandardAction<"notes/update", ClientNote>
  | FluxStandardAction<"storage/finishedLoading">
  | FluxStandardAction<"user/clearEmail">
  | FluxStandardAction<"user/setEmail", string>;

interface State {
  areNotesLoading: boolean;
  isUserLoading: boolean;
  notes: ClientNote[] | undefined;
  userEmail: string | undefined;
}

const initialState: State = {
  areNotesLoading: true,
  isUserLoading: true,
  notes: undefined,
  userEmail: undefined,
};

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {}
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
    case "notes/finishedLoading":
      return { ...state, areNotesLoading: false };
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
