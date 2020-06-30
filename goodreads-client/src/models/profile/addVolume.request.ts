import { BookInfo } from '../books/books.response';
import { Shelf } from './shelves.response';

export type AddVolumeRequest = {
  book: BookInfo,
  shelf: Shelf,
}