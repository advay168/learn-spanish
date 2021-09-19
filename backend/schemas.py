from typing import Optional
from pydantic import BaseModel
from sqlalchemy.sql.base import Options

class Data(BaseModel):
    type: str
    word: str
    translation: str
    id: Optional[int]

    class Config:
        orm_mode = True

class TestQuestion(BaseModel):
    answer: Data
    options: list[Data]