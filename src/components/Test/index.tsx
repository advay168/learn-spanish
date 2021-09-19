import React, { useState, useEffect } from "react";

// Components
import Loading from "../Loading";

// Styles
import { Container } from "./styles";

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
      <h3>What is the translation of the word {answer.word} in english?</h3>
      <h4>Options:</h4>
      {options.slice(0, index).map((option) => (
        <div key={option.id}>
          <button>{option.translation}</button>
          <br />
        </div>
      ))}
      <div key={answer.id}>
        <button>{answer.translation}</button>
        <br />
      </div>
      {options.slice(index).map((option) => (
        <div key={option.id}>
          <button>{option.translation}</button>
          <br />
        </div>
      ))}
    </Container>
  );
}
