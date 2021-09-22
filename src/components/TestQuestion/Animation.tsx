import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  margin-left: 10px;
`;

const Animated = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: auto;
  background-image: linear-gradient(red, black, green);
  animation: loadingAnimation infinite 1s linear;
  @keyframes loadingAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Animation() {
  return (
    <Container>
      <Animated />
    </Container>
  );
}
