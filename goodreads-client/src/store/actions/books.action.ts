import { createAction } from '@reduxjs/toolkit'

export const TOP_BOOKS_REQUEST = '[Books] Top Request';
export const TOP_BOOKS_RESPONSE = '[Books] Top Response';
export const SEARCH_BOOKS_REQUEST = '[Books] Search Request'
export const SEARCH_BOOKS_RESPONSE = '[Books] Search Response'


export const topBooksRequest = createAction<null>(TOP_BOOKS_REQUEST);
export const topBooksResponse = createAction<any>(TOP_BOOKS_RESPONSE);

export const searchBooksRequest = createAction<string>(SEARCH_BOOKS_REQUEST);
export const searchBooksResponse = createAction<any>(SEARCH_BOOKS_RESPONSE);
