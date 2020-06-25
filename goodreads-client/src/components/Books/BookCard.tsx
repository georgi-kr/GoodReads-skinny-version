import React from 'react';

type BooksProps = {
  title: string
  image: string,
  authors: string,
  published: string
};

const BookCard = (props: BooksProps) => {
  return (
    <div className="book-card-container">
      <div className="book-card-image">
        <img src={props.image} alt="book-img" />
      </div>
      <div className="book-card-title">{props.title}</div>
      <div className="book-card-authors">{props.authors}</div>
      <div className="book-card-date">{props.published}</div>
    </div>
  );
}

export default BookCard;

