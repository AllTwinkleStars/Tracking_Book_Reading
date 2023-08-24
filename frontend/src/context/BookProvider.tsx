import React, { useContext, useEffect, useReducer } from "react";
import bookReducer from "./bookReducer";
import BookContext from "./BookContext";
import { getCookie, setCookies } from "cookies-next";
import { getAllBooks } from "@/api/book";
import {
  SET_BOOKS,
  ADD_ITEM,
  REMOVE_ITEM,
  bookType,
  Book,
  SET_BOOK,
  CLEAR_BOOK,
} from "./book-types"

export const ProvideBook = ({ children }: { children: React.ReactNode }) => {
  const value = useProvideBook();
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export const useBook = () => useContext(BookContext);

const useProvideBook = () => {
  const initPersistState: bookType = { book: [] };
  const [state, dispatch] = useReducer(bookReducer, initPersistState);

  useEffect(() => {
    // const fetchBooks = async () => {
    //   const initialBook = await getAllBooks();
    //   if (initialBook?.length > 0) {
    //     dispatch({ type: SET_BOOKS, payload: initialBook });
    //   }
    // }

    // fetchBooks();
  }, []);

  const addItem = (item: Book) => {
    dispatch({
      type: ADD_ITEM,
      payload: item,
    });
  };

  const removeItem = (item: Book) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: item,
    });
  };

  const setBook = (item: Book) => {
    dispatch({
      type: SET_BOOK,
      payload: item,
    })
  };

  const clearBook = () => {
    dispatch({
      type: CLEAR_BOOK,
    });
  };

  const value: bookType = {
    book: state.book,
    addItem,
    removeItem,
    setBook,
    clearBook,
  };

  return value;
}
