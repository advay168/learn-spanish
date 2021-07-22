import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;

export const Nav = styled.nav`
  width: 100%;
  margin-left: 10px;
`;

export const Anchor = styled(Link)<{ $active?: boolean }>`
  background-color: #ff4523;
  color: black;
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px white solid;
  border: 1px white solid;

  ${({ $active }) =>
    $active
      ? css`
          background-color: brown;
          color: white;
        `
      : ""}

  :hover {
    background-color: rgb(185, 91, 91);
  }
`;
