import React from "react";

// Styles
import { Wrapper, Nav, Anchor } from "./styles";

export default function NavBar() {
  let location = "add";
  return (
    <Nav>
      <Wrapper>
        <Anchor href="" active={location === "add"}>
          Add
        </Anchor>
        <Anchor href="" active={location === "learn"}>
          Learn
        </Anchor>
        <Anchor href="" active={location === "test"}>
          Test
        </Anchor>
      </Wrapper>
    </Nav>
  );
}
