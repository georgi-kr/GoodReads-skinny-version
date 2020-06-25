import { ajax, AjaxResponse } from "rxjs/ajax"
import { ENVIROMENT } from '../config/enviroment'
import { of } from 'rxjs'

export const getTopBooks = () => {
  // return ajax.get(`${ENVIROMENT.BASE_URL}products`);
  return of({} as AjaxResponse)
}

export const searchBook = (bookName: string) => {
  return ajax.get(`${ENVIROMENT.BASE_URL}volumes?q=${bookName}`)
}