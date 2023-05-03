import { ComboBox } from "eri";
import { ComponentProps, useContext } from "react";
import { StateContext } from "../AppState";

export default function TagComboBox(
  props: Partial<ComponentProps<typeof ComboBox>>
) {
  const state = useContext(StateContext);
  const tags = new Set<string>();
  if (state.notes) for (const { tag } of state.notes) if (tag) tags.add(tag);

  return (
    <ComboBox
      label="Tag"
      maxLength={64}
      name="tag"
      optional
      options={[...tags].sort((a, b) => a.localeCompare(b))}
      supportiveText="Tags help you group similar notes together"
      {...props}
    />
  );
}
