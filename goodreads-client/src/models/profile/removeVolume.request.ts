import { Shelf } from './shelves.response';

export type RemoveVolumeRequest = {
  bookId: string,
  shelf: Shelf,
}