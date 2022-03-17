import { Select } from "./select";
import { countries } from "../../mock/countries";
import { Strings } from "../../constants";

export default {
  title: "Select",
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const MultipleSelection = {
  args: {
    options: countries,
    placeholder: Strings.SELECT,
    onChange: () => null,
    multiple: true,
  },
};

export const SingleSelection = {
  args: {
    options: countries,
    placeholder: Strings.SELECT,
    onChange: () => null,
    multiple: false,
  },
};
