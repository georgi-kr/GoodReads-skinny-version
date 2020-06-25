import { createReducer } from '@reduxjs/toolkit'

import {
  topBooksRequest,
  topBooksResponse,
  searchBooksRequest,
  searchBooksResponse
} from '../actions/books.action';
import { BookInfo } from '../../models/books/books.response';

export type BooksState = {
  topBooks: any[],
  searchedBooks: BookInfo[],
  loading: boolean;
  errors: { message: string };
}

const initialState: BooksState = {
  topBooks: [],
  searchedBooks: [],
  loading: false,
  errors: null
};

export const booksReducer = createReducer<BooksState>(initialState, builder =>
  builder
    .addCase(topBooksRequest, (state, action) => {
      return {
        ...state,
        errors: null,
        loading: true,
      };
    })
    .addCase(topBooksResponse, (state, action) => {
      return {
        ...state,
        loading: false,
        topBooks: action.payload.result,
        errors: action.payload.errors ? action.payload.errors : null,
      };
    })
    .addCase(searchBooksRequest, (state, action) => {
      return {
        ...state,
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
);