import { use } from "react";
import { StateContext } from "../AppState";

export default function useAppBadge() {
  const state = use(StateContext);
  if (!("setAppBadge" in navigator)) return;
  navigator.setAppBadge(state.notes?.length ?? 0);
}
