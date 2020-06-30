import { combineReducers } from 'redux'

import { authReducer, AuthState } from './auth.reducer';
import { booksReducer, BooksState } from './books.reducer';
import { ProfileState, profileReducer } from './profile.reducer';

export type RootState = {
  auth: AuthState,
  books: BooksState,
  profile: ProfileState
}

export const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  profile: profileReducer
});