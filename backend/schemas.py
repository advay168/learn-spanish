from typing import Optional
from pydantic import BaseModel

class Data(BaseModel):
    type: str
    word: str
    translation: str
    id: Optional[int]

    class Config:
        orm_mode = True