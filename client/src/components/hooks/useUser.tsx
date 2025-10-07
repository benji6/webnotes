import { use, useEffect } from "react";
import { getIdToken } from "../../cognito";
import storage from "../../storage";
import { DispatchContext, StateContext } from "../AppState";

export default function useUser(): void {
  const dispatch = use(DispatchContext);
  const state = use(StateContext);

  useEffect(
    () =>
      void (async () => {
        try {
          const storedEmail = await storage.getEmail();
          if (storedEmail) {
            dispatch({ type: "user/setEmail", payload: storedEmail });
          } else {
            dispatch({ type: "user/clearEmail" });
          }
        } finally {
          dispatch({ type: "storage/finishedLoading" });
        }
        try {
          const idToken = await getIdToken();
          dispatch({ type: "user/setEmail", payload: idToken.payload.email });
        } catch (e) {
          if (e instanceof Error && e.message === "No current user")
            dispatch({ type: "user/clearEmail" });
        }
      })(),
    [dispatch],
  );

  useEffect(() => {
    if (state.isUserLoading) return;
    if (!state.userEmail) storage.deleteEmail();
    else storage.setEmail(state.userEmail);
  }, [state.isUserLoading, state.userEmail]);
}
