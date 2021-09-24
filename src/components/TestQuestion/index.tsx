import React, { useEffect, useState, useMemo, useRef } from "react";

// Components
import Loading from "../Loading";

// Styles
import { Container, Heading, OptionsGrid, Option, NextButton } from "./styles";

// Types
import { dataType, questionType } from "../../types";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function TestQuestion() {
  const [question, setQuestion] = useState<questionType>();
  const [toEnglishOrSpanish, setToEnglishOrSpanish] = useState("");
  const [answered, setAnswered] = useState(false);
  const [loadNextQuestion, setLoadNextQuestion] = useState(false);
  const loading = useRef(false);

  const allOptions = useMemo(() => {
    if (!question) return [];
    const { answer, options } = question;
    let index = Math.floor(Math.random() * (options.length + 1));
    return [...options.slice(0, index), answer, ...options.slice(index)];
  }, [question]);

  useEffect(() => {
    if (loading.current) return;
    loading.current = true;
    setAnswered(false);
    setLoadNextQuestion(false);
    setQuestion(undefined);
    fetch(baseUrl + "test")
      .then((resp) => resp.json())
      .then((json) => setQuestion(json))
      .then(() => (loading.current = false))
      .catch((err) => console.error(err));
    setToEnglishOrSpanish(["en", "es"][Math.floor(Math.random() * 2)]);
  }, [loadNextQuestion]);

  if (!question) return <Loading />;
  const { answer } = question;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const givenAnswer = e.currentTarget.innerText;
    if (
      givenAnswer ===
      (toEnglishOrSpanish === "en" ? answer.translation : answer.word)
    ) {
      alert("Correct!");
    } else {
      alert("Wrong!");
      e.currentTarget.style.backgroundColor = "#ff4500";
    }
    setAnswered(true);
  };

  let questionString: string;
  let optionAttribute: keyof dataType;
  if (toEnglishOrSpanish === "en") {
    questionString = `What is the translation of the word "${answer.word}" in English?`;
    optionAttribute = "translation";
  } else {
    questionString = `What is the translation of the word "${answer.translation}" in Spanish?`;
    optionAttribute = "word";
  }
  return (
    <Container>
      <Heading>{questionString}</Heading>
      <OptionsGrid>
        {allOptions.map((option) => (
          <Option
            onClick={onClick}
            key={option.id}
            disabled={answered}
            style={{
              backgroundColor:
                answered && option.id === answer.id ? "#adff2f" : "",
            }}
          >
            {option[optionAttribute] as string}
          </Option>
        ))}
      </OptionsGrid>
      {answered && (
        <NextButton onClick={() => setLoadNextQuestion(true)}>Next</NextButton>
      )}
    </Container>
  );
}
