from sqlalchemy.orm import Session

from  sqlalchemy.sql.expression import func

import models, schemas

def get_words(db: Session) -> schemas.Data:
    return db.query(models.Word).all()

def add_word(db: Session, data: schemas.Data):
    word = db.query(models.Word).filter_by(word=data.word).first()
    translation = db.query(models.Word).filter_by(translation=data.translation).first()
    if word or translation:
        return
    db_word = models.Word(
        id=data.id, type=data.type, word=data.word, translation=data.translation
    )
    db.add(db_word)
    db.commit()

def get_random_word(db: Session) -> schemas.TestQuestion:
    answer = db.query(models.Word).order_by(func.random()).first()
    options = db.query(models.Word).filter_by(type=answer.type).filter(models.Word.id!=answer.id).limit(3).all()
    return {"answer":answer,"options":options}

def remove_word(db: Session, id: int):
    db.query(models.Word).filter_by(id=id).delete()
    db.commit()
