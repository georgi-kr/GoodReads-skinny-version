import { switchMap, map, catchError } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';
import { of, Observable } from "rxjs";
import { ofType } from "redux-observable";
import { Action } from 'redux-actions'

import { RootState } from "../../reducers/root.reducer";
import { getTopBooks, searchBook } from '../../../services/books-data.service';
import { TOP_BOOKS_REQUEST, topBooksResponse, SEARCH_BOOKS_REQUEST, searchBooksResponse } from '../../actions/books.action';

export const topBooksRequestEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(TOP_BOOKS_REQUEST),
    switchMap((action: { payload: any }) => {
      return getTopBooks().pipe(
        map((response: AjaxResponse) => {
          return topBooksResponse({
            result: response.response,
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
  topBooksRequestEpic,
  searchBookRequestEpic
];