import { use } from "react";
import { StateContext } from "../AppState";

export default function useTags() {
  const state = use(StateContext);
  const tags = new Set<string>();
  if (state.notes) for (const { tag } of state.notes) if (tag) tags.add(tag);
  return [...tags].sort((a, b) => a.localeCompare(b));
}
