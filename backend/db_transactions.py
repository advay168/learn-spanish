from sqlalchemy.orm import Session, session

import models, schemas

def get_words(db: Session):
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

def remove_word(db: Session, id: int):
    db.query(models.Word).filter_by(id=id).delete()
    db.commit()
