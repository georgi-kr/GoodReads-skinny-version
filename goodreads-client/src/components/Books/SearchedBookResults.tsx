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
    if (!this.props.searchBookResultsData) {
      return (
        <div className="info-msg center-items">
          <span>
            No results for the search.
          </span>
        </div>
      )
    }
    return (
      <div className="book-list">
        {
          this.props.searchBookResultsData.map((book) => {
            const { imageLinks, authors, title, publishedDate } = book.volumeInfo;
            return <BookCard
              key={book.id}
              id={book.id}
              image={imageLinks}
              authors={authors}
              title={title}
              published={publishedDate}
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



