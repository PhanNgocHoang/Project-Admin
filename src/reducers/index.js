import { combineReducers } from "redux";
import login from "./login.reducer";
import authors from "./bookAuthor.reducer";
import bookType from "./bookType.reducer";
import publishers from "./bookPublisher.reducer";
import book from "./book.reducer";
export const myReducers = combineReducers({
  login,
  authors,
  bookType,
  publishers,
  book,
});
