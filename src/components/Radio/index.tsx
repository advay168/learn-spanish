import React from "react";

// Styles
import { Wrapper } from "./styles";

interface props {
  name: string;
  text: string;
}

export default function Radio({ name, text }: props) {
  return (
    <Wrapper>
      <label>
        <input
          type="radio"
          name={name}
          style={{ width: "16px", height: "16px" }}
          value={text}
          required
        />
        {text}
      </label>
    </Wrapper>
  );
}
