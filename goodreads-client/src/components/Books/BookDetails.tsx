import React, { Component } from 'react';

import noImage from '../../assets/icons/noImage.png'
import { getBookById } from '../../services/books-data.service';
import AddBookToShelf from '../Profile/AddBookToShelf';

type BookDetailsProps = {
  match: any,
};

type BookDetailsState = {
  title: string,
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string
  },
  authors: string[],
  publishedDate: string,
  description: string,
  categories: string[],
  averageRating: number,
  ratingsCount: number,
  publisher: string,
  id: string
};

class BookDetails extends Component<BookDetailsProps, BookDetailsState> {

  componentDidMount() {
    const { match: { params } } = this.props;
    getBookById(params.id).subscribe(response => {
      const {volumeInfo, id} = response.response;
      this.setState({ ...volumeInfo, id });
      this.forceUpdate();
    })
  }

  getAuthor = () => {
    if (this.state.authors && this.state.authors.join(', ')) {
      return this.state.authors.join(', ')
    } else {
      return 'unknown';
    }
  }

  getImage = () => {
    return this.state.imageLinks || this.state.imageLinks.thumbnail ? this.state.imageLinks.thumbnail : noImage;
  }

  getCategories = () => {
    if (this.state.categories && this.state.categories.join(', ')) {
      return this.state.categories.join(', ')
    } else {
      return 'unknown';
    }
  }

  render() {
    if (!this.state) {
      return <div className="info-msg">Loading...</div>
    }
    return (
      <div className="book-details-container center-items" >
        <div className="base-info center-items flex-column">
          <div className="book-details-image">
            <img src={this.getImage()} alt="book-img" />
          </div>
          <div className="book-details-title">{this.state.title}</div>
          <div className="ratings">
            <span className="avg-rating">Rating: {this.state.averageRating || 0}</span>
            <span className="reviews"> Reviews: {this.state.ratingsCount || 0}</span>
          </div>
          <AddBookToShelf volume={{id: this.state.id,volumeInfo: this.state}}/>
        </div>
        <div className="text-info">
          <div className="field-title">Authors</div>
          <div className="book-details-authors">{this.getAuthor()}</div>
          <div className="field-title">Published</div>
          <div className="book-details-date">
            {this.state.publishedDate}
            <span className="publisher">, by {this.state.publisher}</span>
          </div>
          <div className="field-title">Categories</div>
          <div className="book-categories">{this.getCategories()}</div>
          <div className="book-description" dangerouslySetInnerHTML={{ __html: this.state.description }} />
        </div>
      </div>
    )

  };
}

export default BookDetails;

