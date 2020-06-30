export type searchBooksResponse = {
  items: BookInfo,
}

export type BookInfo = {
  id: string,
  volumeInfo: Book,
}

export type Book = {
  title: string,
  authors: string[],
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string,
  },
  categories: string[],
  description: string,
  publishedDate: string,
  publisher: string
}