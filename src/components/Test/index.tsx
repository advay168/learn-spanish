import React, { useState, useEffect } from "react";

// Components
import Loading from "../Loading";

// Styles
import { Container, Heading, OptionsGrid, Option } from "./styles";

// Types
import { questionType } from "../../types";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Test() {
  const [question, setQuestion] = useState<questionType>();
  useEffect(() => {
    fetch(baseUrl + "test")
      .then((resp) => resp.json())
      .then((json) => setQuestion(json))
      .catch((err) => console.error(err));
  }, []);
  console.log(question);

  if (!question) return <Loading />;
  const { answer, options } = question;
  const index = Math.floor(Math.random() * options.length);
  answer.type = "answer";
  console.log(index, options.length);

  return (
    <Container>
      <Heading>
        What is the translation of the word {answer.word} in english?
      </Heading>
      <OptionsGrid>
        {options.slice(0, index).map((option) => (
          <Option key={option.id}>{option.translation}</Option>
        ))}
        <Option key={answer.id}>{answer.translation}</Option>
        {options.slice(index).map((option) => (
          <Option key={option.id}>{option.translation}</Option>
        ))}
      </OptionsGrid>
    </Container>
  );
}
