import { BookInfo } from '../books/books.response';

export type ShelvesResponse = Shelf[];

export type Shelf = {
  id: string,
  title: string,
  volume: BookInfo[],
}