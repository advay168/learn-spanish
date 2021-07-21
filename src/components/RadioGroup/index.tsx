import React from "react";

import Radio from "../Radio";

// Styles
import { Wrapper } from "./styles";

interface props {
  name: string;
  labels: string[];
}

export default function RadioGroup({ name, labels }: props) {
  const radios = labels.map((label) => (
    <Radio name={name} text={label} key={label} />
  ));
  return <Wrapper>{radios}</Wrapper>;
}
