import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BookInfo } from '../../models/books/books.response';
import { RootState } from '../../store/reducers/root.reducer';
import BookCard from './BookCard';

type SearchedBookResultsProps = {
  searchBookResult: Function,
  searchBookResultsData: BookInfo[]
};
type SearchedBookResultsState = BookInfo[];

class SearchedBookResults extends Component<SearchedBookResultsProps, SearchedBookResultsState> {

  render() {
    return (
      <div className="book-list">
        {
          this.props.searchBookResultsData.map((book) => {
            return <BookCard
              key={book.id}
              image={book.volumeInfo.imageLinks.smallThumbnail}
              authors={book.volumeInfo.authors.join(', ')}
              title={book.volumeInfo.title}
              published={book.volumeInfo.publishedDate}
            />
          })
        }
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  searchBookResultsData: state.books.searchedBooks,
});

export default connect(
  mapStateToProps,
  {},
)(SearchedBookResults)



