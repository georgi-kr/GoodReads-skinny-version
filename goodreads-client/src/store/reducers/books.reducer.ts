import { createReducer } from '@reduxjs/toolkit'

import {
  searchBooksRequest,
  searchBooksResponse,
  selectGenre,
  newestBooksRequest,
  newestBooksResponse
} from '../actions/books.action';
import { BookInfo } from '../../models/books/books.response';

export type BooksState = {
  newestBooks: {
    [key: string]: BookInfo[]
  }
  searchedBooks: BookInfo[],
  selectedGenre: string,
  loading: boolean;
  errors: { message: string };
}

const initialState: BooksState = {
  newestBooks: {},
  searchedBooks: [],
  selectedGenre: '',
  loading: false,
  errors: null
};

export const booksReducer = createReducer<BooksState>(initialState, builder =>
  builder
    .addCase(newestBooksRequest, (state, action) => {
      return {
        ...state,
        errors: null,
        loading: true,
      };
    })
    .addCase(newestBooksResponse, (state, action) => {
      const { genre, result, errors } = action.payload;
      return {
        ...state,
        loading: false,
        newestBooks: {
          ...state.newestBooks,
          [genre] : result
        },
        errors: errors ? errors : null,
      };
    })
    .addCase(searchBooksRequest, (state, action) => {
      return {
        ...state,
        searchedBooks: [],
        errors: null,
        loading: true,
      }
    })
    .addCase(searchBooksResponse, (state, action) => {
      return {
        ...state,
        loading: false,
        searchedBooks: action.payload.result,
        errors: action.payload.errors ? action.payload.errors : null,
      }
    })
    .addCase(selectGenre, (state, action) => {
      return {
        ...state,
        selectedGenre: action.payload
      }
    })
);