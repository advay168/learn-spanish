import mlconjug3
conjugator = mlconjug3.Conjugator(language="es")

def conjugate(word:str, subject:str, mood:str, tense:str):
    verb = conjugator.conjugate(word)
    x  = set()
    y = set()
    for mood_, tense_, *_ in verb.iterate():
        x.add(tense_.split(" ",1)[0])
        y.add(tense_)
    output = verb.conjug_info[mood][mood+" "+tense][subject]
    return output

