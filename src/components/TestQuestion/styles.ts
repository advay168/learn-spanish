import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Heading =styled.h3`
  font-size:2rem;
  text-align: center;
  color: #924848;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-items: center;
  margin: 5px 20px;
`;

export const Option = styled.button`
  width:100%;
  max-width:500px;
  height: 90px;
  font-size: 20px;
  color: black;
  border-radius: 15px;
`;

export const NextButton = styled.button`
  width: 60%;
  max-width:500px;
  height: 40px;
  margin: 50px auto;
  border-radius: 10px;
`;