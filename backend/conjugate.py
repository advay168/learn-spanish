from typing import cast
import mlconjug3

conjugator = mlconjug3.Conjugator(language="es")


def conjugate(word: str, subject: str, mood: str, tense: str) -> str:
    verb = conjugator.conjugate(word)
    if verb is None:
        return word
    for a in verb.iterate():
        print(a)
    mood_output = verb.conjug_info[mood]
    if isinstance(mood_output, str):
        return mood_output
    mood_tense_output = mood_output[mood + " " + tense]
    if isinstance(mood_tense_output, str):
        return mood_tense_output
    return cast(str, mood_tense_output[subject])
