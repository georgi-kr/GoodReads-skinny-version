import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/reducers/root.reducer';
import { BookInfo } from '../../models/books/books.response';
import { Shelf } from '../../models/profile/shelves.response';
import BookCard from '../Books/BookCard';

type ProfileProps = {
  bookShelves: { [key: string]: Shelf },
  book: BookInfo
}

class Profile extends Component<ProfileProps, {}> {
  render() {
    let list: any = [];
    Object.values(this.props.bookShelves).map((shelf) => {
      list.push(<div className="page-title" key={shelf.title}>{shelf.title}</div>)
      if (shelf.volume.length === 0) {
        list.push(
          <div className="info-msg center-items" key={shelf.id}>
            <span>
              No books in the list
            </span>
          </div>
        )
      }
      list.push(
        <div className="book-list-profile" key={shelf.id + shelf.title}>
          {
            shelf.volume.map((book) => {
              const { imageLinks, authors, title, publishedDate } = book.volumeInfo;
              return <BookCard
                volume={book}
                key={book.id}
                id={book.id}
                image={imageLinks}
                authors={authors}
                title={title}
                published={publishedDate}
              />
            })
          }
        </div>
      )
    })
    return (
      <div className="profile-container">
        {list}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  bookShelves: state.profile.bookShelves
});

export default connect(
  mapStateToProps,
  {},
)(Profile)


