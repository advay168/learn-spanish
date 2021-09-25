import React, { useEffect, useState, useMemo, useRef } from "react";

// Components
import Loading from "../Loading";

// Styles
import {
  Container,
  Heading,
  OptionsGrid,
  Option,
  NextButton,
  AnswerResponse,
} from "./styles";

// Types
import { dataType, questionType } from "../../types";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function TestQuestion() {
  const [question, setQuestion] = useState<questionType>();
  const [toEnglishOrSpanish, setToEnglishOrSpanish] = useState("");
  const [answerChecked, setAnswerChecked] = useState("");
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
    setAnswerChecked("");
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
      setAnswerChecked("Correct!");
    } else {
      setAnswerChecked("Wrong!");
      e.currentTarget.style.backgroundColor = "#ff4500";
    }
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
        {allOptions.map((option, idx) => (
          <Option
            onClick={onClick}
            key={option.id}
            disabled={answerChecked ? true : false}
            style={{
              backgroundColor:
                answerChecked && option.id === answer.id ? "#adff2f" : "",
            }}
          >
            {option[optionAttribute] as string}
          </Option>
        ))}
      </OptionsGrid>
      {answerChecked && (
        <>
          <AnswerResponse
            style={{
              color: answerChecked === "Correct!" ? "green" : "red",
            }}
          >
            {answerChecked}
          </AnswerResponse>
          <NextButton onClick={() => setLoadNextQuestion(true)} autoFocus>
            Next
          </NextButton>
        </>
      )}
    </Container>
  );
}
