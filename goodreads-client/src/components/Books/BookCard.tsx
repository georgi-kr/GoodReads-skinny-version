import React from 'react';

import noImage from '../../assets/icons/noImage.png'
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/paths.constant';

type BooksProps = {
  id: string,
  title: string
  image: {
    smallThumbnail: string
  },
  authors: string[],
  published: string
};

const BookCard = (props: BooksProps) => {
  const getAuthor = () => {
    if (props.authors && props.authors.join(', ')) {
      return props.authors.join(', ')
    } else {
      return '';
    }
  }

  const getImage = () => {
    return props.image ? props.image.smallThumbnail : noImage
  }

  return (
    <div className="book-card-container">
      <Link to={`${PATHS.DETAILS}/${props.id}`}>
        <div className="book-card-image">
          <img src={getImage()} alt="book-img" />
        </div>
        <div className="book-card-title">{props.title}</div>
        <div className="book-card-authors">{getAuthor()}</div>
        <div className="book-card-date">{props.published}</div>
      </Link>
    </div>
  );
}

export default BookCard;

