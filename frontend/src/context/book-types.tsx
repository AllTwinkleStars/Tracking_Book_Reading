export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SET_BOOK = "SET_BOOK";
export const SET_BOOKS = "SET_BOOKS";
export const CLEAR_BOOK = "CLEAR_BOOK";

export type Book = {
  id?: number;
  title: string;
  shelves: number;
}

export type bookFuncType = (item: Book) => void;

export type bookType = {
  book: Book[];
  setBooks?: (bookItems: Book[]) => void;
  addItem?: bookFuncType;
  removeItem?: bookFuncType;
  setBook?: bookFuncType;
  clearBook?: () => void;
}