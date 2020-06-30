import { ajax } from "rxjs/ajax"
import { ENVIROMENT } from '../config/enviroment'

export const searchBook = (bookName: string) => {
  return ajax.get(`${ENVIROMENT.BASE_URL}volumes?q=${bookName}`);
}

export const getNewestByGenre = (genre: string) => {
  return ajax
    .get(`${ENVIROMENT.BASE_URL}volumes?q=subject:${genre}&orderBy=newest`);
}

export const getBookById = (id: string) => {
  return ajax.get(`${ENVIROMENT.BASE_URL}volumes/${id}`);
}
