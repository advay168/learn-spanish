import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: inline-flex;
  margin-left: 10px;
`;

const keyframesAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Animated = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: auto;
  background-image: linear-gradient(red, black, green);
  animation: ${keyframesAnimation} infinite 1s linear;
`;

export default function Animation() {
  return (
    <Container>
      <Animated />
    </Container>
  );
}
