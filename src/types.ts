export type dataType = {
  type: string;
  word: string;
  translation: string;
  id: number | null;
};

export type questionType = {
  answer: dataType;
  options: dataType[];
}