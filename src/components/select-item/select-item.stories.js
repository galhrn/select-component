import { SelectItem } from "./select-item";

export default {
  title: "Select Item",
  component: SelectItem,
};

const Selected = (args) => <SelectItem {...args} />;

export const SelectedItem = {
  args: {
    selected: true,
    item: { id: 1, value: "selected-item", label: "Selected item" },
    onClick: () => null,
  },
};

export const UnselectedItem = {
  args: {
    selected: false,
    item: { id: 2, value: "unselected-item", label: "Unselected item" },
    onClick: () => null,
  },
};
