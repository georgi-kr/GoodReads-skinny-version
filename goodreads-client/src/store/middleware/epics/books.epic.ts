import { switchMap, map, catchError } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';
import { of, Observable } from "rxjs";
import { ofType } from "redux-observable";
import { Action } from 'redux-actions'

import { RootState } from "../../reducers/root.reducer";
import { searchBook, getNewestByGenre } from '../../../services/books-data.service';
import {
  SEARCH_BOOKS_REQUEST,
  searchBooksResponse,
  SELECT_GENRE,
  newestBooksRequest,
  NEWEST_BOOKS_REQUEST,
  newestBooksResponse
} from '../../actions/books.action';

export const selectGenreEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(SELECT_GENRE),
    switchMap((action: { payload: string }) => {
      return of(newestBooksRequest(action.payload))
    })
  );

export const newestBooksRequestEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(NEWEST_BOOKS_REQUEST),
    switchMap((action: { payload: string }) => {
      if ((store as any).value.books.newestBooks[action.payload]) {
        return of(
          newestBooksResponse({
            genre: '',
            result: [],
            errors: []
          })
        );
      }
      return getNewestByGenre(action.payload).pipe(
        map((response: AjaxResponse) => {
          return newestBooksResponse({
            genre: action.payload,
            result: response.response.items,
            errors: response.response.errors
          });
        }),
        catchError((error) =>
          of({
            error: error ? error : null,
            result: null
          })
        )
      )
    })
  )

export const searchBookRequestEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(SEARCH_BOOKS_REQUEST),
    switchMap((action: { payload: string }) => {
      return searchBook(action.payload).pipe(
        map((response: AjaxResponse) => {
          return searchBooksResponse({
            result: response.response.items,
            errors: response.response.error
          });
        }),
        catchError((error) =>
          of({
            error: error ? error : null,
            result: null
          })
        ),
      );
    })
  );

export default [
  selectGenreEpic,
  newestBooksRequestEpic,
  searchBookRequestEpic,
];