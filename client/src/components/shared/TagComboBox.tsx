import { ComboBox } from "eri";
import { ComponentProps } from "react";
import useTags from "../hooks/useTags";

export default function TagComboBox(
  props: Partial<ComponentProps<typeof ComboBox>>,
) {
  const tags = useTags();

  return (
    <ComboBox
      label="Tag"
      maxLength={64}
      name="tag"
      optional
      options={tags}
      supportiveText="Tags help you group similar notes together"
      {...props}
    />
  );
}
