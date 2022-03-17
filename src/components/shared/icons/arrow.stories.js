import React from "react";
import { Arrow } from "./arrow";

export default {
  title: "Arrow",
  component: Arrow,
};

const Template = (args) => <Arrow />;

export const ArrowDown = {
  args: {
    direction: "down",
  },
};

export const ArrowUp = {
  args: {
    direction: "up",
  },
};
