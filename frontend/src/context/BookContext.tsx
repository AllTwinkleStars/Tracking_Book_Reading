import { createContext } from "react";
import { bookType } from "./book-types";

export const initialContextValues: bookType = {
  book: [],
};

const BookContext = createContext<bookType>(initialContextValues);

export default BookContext;