import { createAction } from '@reduxjs/toolkit'

export const NEWEST_BOOKS_REQUEST = '[Books] Newest Request';
export const NEWEST_BOOKS_RESPONSE = '[Books] Newest Response';
export const SEARCH_BOOKS_REQUEST = '[Books] Search Request'
export const SEARCH_BOOKS_RESPONSE = '[Books] Search Response'
export const SELECT_GENRE = '[Books] Select Genre'

export const newestBooksRequest = createAction<string>(NEWEST_BOOKS_REQUEST);
export const newestBooksResponse = createAction<any>(NEWEST_BOOKS_RESPONSE);

export const searchBooksRequest = createAction<string>(SEARCH_BOOKS_REQUEST);
export const searchBooksResponse = createAction<any>(SEARCH_BOOKS_RESPONSE);

export const selectGenre = createAction<string>(SELECT_GENRE);
