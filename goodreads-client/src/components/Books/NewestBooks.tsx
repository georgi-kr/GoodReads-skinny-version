import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BookInfo } from '../../models/books/books.response';
import { RootState } from '../../store/reducers/root.reducer';
import { selectGenre } from '../../store/actions/books.action'
import BookCard from './BookCard';
import { GENRES } from '../../constants/genres.constant'

type NewestBooksProps = {
  newestBooks: { [key: string]: BookInfo[] };
  selectGenre: Function;
  selectedGenre: string;
  isLoading: boolean;
} & typeof mapStateToProps;
type SearchedBookResultsState = BookInfo[];

class NewestBooks extends Component<NewestBooksProps, SearchedBookResultsState> {
  componentDidMount() {
    this.loadInitial();
  }

  loadInitial = () => {
    this.props.selectGenre(GENRES[0]);
  }

  render() {
    {
      if (this.props.isLoading) {
        return (
          <div className="info-msg center-items">
            <span>
              Loading... Please wait.
            </span>
          </div>
        )
      } else if (
        !this.props.newestBooks[this.props.selectedGenre] ||
        this.props.newestBooks[this.props.selectedGenre].length === 0
      ) {
        return (
          <div className="info-msg center-items">
            <span>
              No books found for the selected Category
            </span>
          </div>
        )
      }
    }
    return (
      <div className="book-list">
        {
          this.props.newestBooks[this.props.selectedGenre].map((book) => {
            const { imageLinks, authors, title, publishedDate } = book.volumeInfo;
            return <BookCard
              key={book.id}
              id={book.id}
              image={imageLinks}
              authors={authors}
              title={title}
              published={publishedDate}
              volume={book}
            />
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  newestBooks: state.books.newestBooks,
  isLoading: state.books.loading,
  selectedGenre: state.books.selectedGenre
});

export default connect(
  mapStateToProps,
  { selectGenre },
)(NewestBooks)



