import React from "react";

import { useLocation } from "react-router-dom";

// Styles
import { Wrapper, Nav, Anchor } from "./styles";

export default function NavBar() {
  let location = useLocation();
  return (
    <Nav>
      <Wrapper>
        <Anchor to="/" $active={location.pathname === "/add"}>
          Add
        </Anchor>
        <Anchor to="learn" $active={location.pathname === "/learn"}>
          Learn
        </Anchor>
        <Anchor to="/" $active={location.pathname === "/test"}>
          Test
        </Anchor>
      </Wrapper>
    </Nav>
  );
}
