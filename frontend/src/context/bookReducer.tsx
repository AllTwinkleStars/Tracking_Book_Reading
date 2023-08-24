import { useReducer } from 'react';
import {
  SET_BOOKS,
  ADD_ITEM,
  REMOVE_ITEM,
  bookType,
  Book,
  CLEAR_BOOK,
  SET_BOOK,
} from "./book-types";

import { addBook, updateBook, removeBook } from '../api/book';

const addItemtoBook = (
  bookItems: Book[],
  item: Book,
) => {
  const addedBook = addBook(item);
  return [
    ...bookItems,
    item
  ]
}

const setBookItem = (
  bookItems: Book[],
  item: Book,
) => {
  updateBook(item);
  return bookItems.map(bookItem => bookItem.id === item.id ? item : bookItem);
}

const removeBookItem = (
  item: Book
) => {
  if (item.id !== undefined)
    return removeBook(item.id);
}

type actionType = {
  type: string;
  payload?: Book | Book[];
}

const bookReducer = (state: bookType, action: actionType) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        book: action.payload as Book[]
      }
    case ADD_ITEM:
      return {
        ...state,
        book: addItemtoBook(state.book, action.payload as Book),
      };
    case REMOVE_ITEM:
      removeBookItem(action.payload as Book);
      return {
        ...state,
        book: state.book.filter(
          (bookItem) => bookItem.id !== (action.payload as Book).id,
        )
      };
    case SET_BOOK:
      return {
        ...state,
        book: setBookItem(state.book, action.payload as Book),
      };
    case CLEAR_BOOK:
      return {
        ...state,
        book: []
      }
    default:
      return state;
  }
}

export default bookReducer;
