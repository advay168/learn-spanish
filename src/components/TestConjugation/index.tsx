import React, { useEffect, useState, useRef } from "react";

// Components
import Loading from "../Loading";

// Styles
import {
  Container,
  Heading,
  NextButton,
  AnswerResponse,
  AnswerInput,
  InputLabel,
} from "./styles";

const baseUrl = process.env.REACT_APP_BASE_URL;

const tenses = [
  ["Indicativo", "presente", ["1s", "2s", "3s", "1p", "2p", "3p"]],
  ["Indicativo", "pretérito imperfecto", ["1s", "2s", "3s", "1p", "2p", "3p"]],
  [
    "Indicativo",
    "pretérito perfecto simple",
    ["1s", "2s", "3s", "1p", "2p", "3p"],
  ],
  ["Indicativo", "futuro", ["1s", "2s", "3s", "1p", "2p", "3p"]],
  ["Subjuntivo", "presente", ["1s", "2s", "3s", "1p", "2p", "3p"]],
  ["Imperativo", "Afirmativo", ["2s", "3s", "1p", "2p", "3p"]],
  ["Imperativo", "non", ["2s no", "3s no", "1p no", "2p no", "3p no"]],
  ["Condicional", "Condicional", ["1s", "2s", "3s", "1p", "2p", "3p"]],
  ["Gerundio", "Gerondio", [""]],
  ["Participo", "Participo", ["1s", "2s", "3s", "1p", "2p", "3p"]],
];

export default function TestQuestion() {
  const [verb, setVerb] = useState("");
  const [tense, setTense] = useState("");
  const [subject, setSubject] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerChecked, setAnswerChecked] = useState("");
  const [answerMessage, setAnswerMessage] = useState("");
  const [loadNextQuestion, setLoadNextQuestion] = useState(false);
  const loading = useRef(false);
  const answerInputRef = useRef<HTMLInputElement>(null);

  // Load next question
  useEffect(() => {
    (async function () {
      if (loading.current) return;
      loading.current = true;
      setAnswerChecked("");
      setAnswerMessage("");
      setLoadNextQuestion(false);
      setVerb("");
      const resp = await fetch(baseUrl + "test_conjugation");
      const verb = await resp.json();
      loading.current = false;
      const tenseIndex = Math.floor(Math.random() * tenses.length);
      const [mood, tense, subjects] = tenses[tenseIndex];
      const subjectIndex = Math.floor(Math.random() * subjects.length);
      setVerb(verb);
      setTense(mood + " " + tense);
      const subject = subjects[subjectIndex];
      setSubject(subject);
      //Todo: Move fetch to useEffect after verb is loaded
      const resp2 = await fetch(
        baseUrl +
          `conjugate?word=${verb}&subject=${subject}&mood=${mood}&tense=${tense}`
      );
      const conjugated = await resp2.json();
      setAnswer(conjugated);
    })();
  }, [loadNextQuestion]);

  if (!verb) return <Loading />;

  //Check Answer
  const onClick = () => {
    const givenAnswer = answerInputRef.current?.value ?? "";

    if (givenAnswer === answer) {
      setAnswerChecked("Correct!");
    } else if (
      answer.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === givenAnswer
    ) {
      setAnswerChecked("Correct!");
      setAnswerMessage("Be careful of Accents: " + answer);
    } else {
      setAnswerChecked("Wrong!");
      setAnswerMessage("Correct answer: " + answer);
      console.log(givenAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }
    answerInputRef.current!.disabled = true;
  };
  return (
    <Container>
      <Heading>
        What is the Conjugation of {verb} <br />
        Tense: {tense} <br />
        Subject: {subject}
      </Heading>
      <InputLabel>
        Answer:
        <AnswerInput
          ref={answerInputRef}
          autoFocus
          onKeyDown={
            (e) =>
              e.key === "Enter" ? setTimeout(onClick, 100) : null /* debounce*/
          }
        />
      </InputLabel>
      {!answerChecked && <NextButton onClick={onClick}> Check</NextButton>}
      {answerChecked && (
        <>
          <AnswerResponse
            style={{
              color: answerChecked === "Correct!" ? "green" : "red",
            }}
          >
            {answerChecked}
            <br />
            <span style={{ color: "green" }}>{answerMessage}</span>
          </AnswerResponse>
          <NextButton onClick={() => setLoadNextQuestion(true)} autoFocus>
            Next
          </NextButton>
        </>
      )}
    </Container>
  );
}
