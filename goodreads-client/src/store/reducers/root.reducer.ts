import { combineReducers } from 'redux'

import { authReducer, AuthState } from './auth.reducer';
import { booksReducer, BooksState } from './books.reducer';

export type RootState = {
  auth: AuthState,
  books: BooksState,
}

export const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
});