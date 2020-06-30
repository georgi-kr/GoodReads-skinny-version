import { switchMap, map, catchError } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';
import { of, Observable, merge, concat } from "rxjs";
import { ofType } from "redux-observable";
import { Action } from 'redux-actions'

import { RootState } from "../../reducers/root.reducer";
import {
  SHELVES_REQUEST,
  shelvesResponse,
  SHELVES_RESPONSE,
  shelfVolumeResponse,
  ADD_TO_SHELF_REQUEST,
  addToShelfResponse,
  REMOVE_FROM_SHELF_REQUEST,
  removeFromShelfResponse,
  removeFromShelfRequest,
} from '../../actions/profile.action';
import {
  getShelves,
  getShelfVolume,
  addVolumeToShelf,
  removeVolumeFromShelf
} from '../../../services/profile-data.service';
import { BOOKSHELVES } from '../../../constants/bookshelves.constant';
import { ShelvesResponse, Shelf } from '../../../models/profile/shelves.response';
import { Book, BookInfo } from '../../../models/books/books.response';
import { AddVolumeRequest } from '../../../models/profile/addVolume.request';
import { RemoveVolumeRequest } from '../../../models/profile/removeVolume.request';

export const shelvesRequestEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(SHELVES_REQUEST),
    switchMap((action: { payload: string }) => {
      const token = (store as any).value.auth.data.accessToken
      return getShelves(token).pipe(
        map((response: AjaxResponse) => {
          const shelvesList: { [key: string]: Shelf } = {};
          response.response.items.forEach((shelf: any) => {
            if (
              shelf.title === BOOKSHELVES.TO_READ ||
              shelf.title === BOOKSHELVES.HAVE_READ
            ) {
              shelvesList[shelf.title] = ({ title: shelf.title, id: shelf.id, volume: [] })
            }
          })
          return shelvesResponse({
            result: shelvesList,
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

export const shelvesResponseEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(SHELVES_RESPONSE),
    switchMap((action: { payload: { result: ShelvesResponse } }) => {
      const shelves = action.payload.result;
      const token = (store as any).value.auth.data.accessToken
      const actionsArray = [];
      for (const key in shelves) {
        actionsArray.push(getShelfVolume(+shelves[key].id, token).pipe(
          map((response: AjaxResponse) => {
            const bookList: Book[] = response.response.items || [];
            return shelfVolumeResponse({
              result: { bookList, id: key },
              errors: response.response.error
            });
          }),
          catchError((error) =>
            of({
              error: error ? error : null,
              result: null
            })
          ),
        ))
      }
      return concat(...actionsArray);
    })
  )

export const addToShelfRequestEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(ADD_TO_SHELF_REQUEST),
    switchMap((action: { payload: AddVolumeRequest }) => {
      const token = (store as any).value.auth.data.accessToken
      const actionsArray: any = [];
      const shelfs = (store as any).value.profile.bookShelves;
      Object.keys(shelfs).forEach((shelf) => {
        const existingInOtherShelfIndex =
          shelfs[shelf].volume.findIndex((book: BookInfo) => book.id === action.payload.book.id)
        if (existingInOtherShelfIndex != -1) {
          actionsArray.push(
            of(
              removeFromShelfRequest({
                bookId: action.payload.book.id,
                shelf: shelfs[shelf]
              })
            )
          )
        }
      })
      actionsArray.push(addVolumeToShelf(action.payload.book.id, +action.payload.shelf.id, token)
        .pipe(
          map(() => {
            return addToShelfResponse({
              volume: action.payload.book,
              shelf: action.payload.shelf.title
            })
          }),
          catchError((error) =>
            of({
              error: error ? error : null,
              result: null
            })
          ),
        ))
        return concat(...actionsArray);
      })
  )

export const removeFromShelfRequestEpic = (action$: Observable<Action<any>>, store: RootState) =>
  action$.pipe(
    ofType(REMOVE_FROM_SHELF_REQUEST),
    switchMap((action: { payload: RemoveVolumeRequest }) => {
      const { bookId, shelf } = action.payload;
      const token = (store as any).value.auth.data.accessToken;
      const volumeIndex = (store as any).value.profile.bookShelves[shelf.title].volume.findIndex(
        (element: BookInfo) => element.id === bookId)
      return removeVolumeFromShelf(bookId, +shelf.id, token)
        .pipe(
          map((response) => {
            return removeFromShelfResponse({
              index: volumeIndex,
              shelf: shelf
            })
          }),
          catchError((error) =>
            of({
              error: error ? error : null,
              result: null
            })
          ),
        )
    })
  )

export default [
  shelvesRequestEpic,
  shelvesResponseEpic,
  addToShelfRequestEpic,
  removeFromShelfRequestEpic,
];