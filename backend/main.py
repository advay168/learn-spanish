from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine
import models, schemas, db_transactions

from sqlalchemy.orm import Session

import config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
  models.Base.metadata.create_all(bind=engine)
except:
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/learn", response_model=list[schemas.Data])
async def learn(session: Session = Depends(get_db)):
    return db_transactions.get_words(session)


@app.delete("/remove/{id}")
async def remove(id: int, session: Session = Depends(get_db)):
    db_transactions.remove_word(session, id)
    return True


@app.post("/add")
async def add(data: schemas.Data, session: Session = Depends(get_db)):
    db_transactions.add_word(session, data)
    return True

@app.get("/test", response_model=schemas.TestQuestion)
async def test(session: Session = Depends(get_db)):
    return db_transactions.get_random_word(session)