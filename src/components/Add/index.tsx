import React, { useState } from "react";

// Components
import RadioGroup from "../RadioGroup";

// Styles
import {
  Partition,
  Wrapper,
  Heading,
  TextInput,
  AddButton,
  Container,
  OuterWrapper,
  ButtonContainer,
} from "./styles";

import { dataType } from "../../types";

function sendData(data: dataType) {
  const url = "http://localhost:5000/add";
  fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export default function Add() {
  const [data, setData] = useState<dataType>({
    type: "",
    word: "",
    translation: "",
    id: 0,
  });
  if (data.type) {
    console.log(data);
    sendData(data);
  }

  return (
    <form
      onSubmit={(e) => {
        const form = e.target as HTMLFormElement;
        let entries = new FormData(form).values();

        let type = entries.next().value;
        let word = entries.next().value;
        let translation = entries.next().value;

        setData({ type, word, translation, id: null });
        e.preventDefault();
      }}
    >
      <OuterWrapper>
        <Wrapper>
          <Partition>
            <Heading>Type</Heading>
            <RadioGroup
              name="type"
              labels={["Noun", "Verb", "Preposition", "Adjective", "Phrase"]}
            />
          </Partition>
          <Partition>
            <Heading>
              Word
              <br />
              (Spanish)
            </Heading>
            <Container>
              <TextInput placeholder="Word" name="word" required />
            </Container>
          </Partition>
          <Partition>
            <Heading>
              Translation
              <br />
              (English)
            </Heading>
            <Container>
              <TextInput
                placeholder="Translation"
                name="translation"
                required
              />
            </Container>
          </Partition>
        </Wrapper>
        <ButtonContainer>
          <AddButton type="submit">Add</AddButton>
        </ButtonContainer>
      </OuterWrapper>
    </form>
  );
}
