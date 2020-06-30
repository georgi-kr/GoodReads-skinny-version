import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../shared/history';

import { RootState } from '../../store/reducers/root.reducer';
import { Shelf } from '../../models/profile/shelves.response';
import { addToShelfRequest, removeFromShelfRequest } from '../../store/actions/profile.action'
import { BookInfo } from '../../models/books/books.response';
import { PATHS } from '../../constants/paths.constant';

type AddBookToShelfProps = {
  addToShelfRequest: Function;
  removeFromShelfRequest: Function;
  volume: BookInfo;
  bookShelves: { [key: string]: Shelf };
  logged: boolean;
}

class AddBookToShelf extends Component<AddBookToShelfProps, {}> {

  _currentShelf: Shelf = null;
  _showCurrent = true;

  componentDidMount() {
    if (this.props.bookShelves && this.props.logged) {
      this.viewChanges();
      this.findBookOwnShelf();
    }
  }
  
  componentDidUpdate(prevProps: any, prevState: any) {
    if (!this.props.logged || !this.props.bookShelves) {
      return;
    }
    if (prevProps !== this.props) {
      this.findBookOwnShelf();
    }
  }

  findBookOwnShelf() {
    let inShelf = false;
    Object.keys(this.props.bookShelves).forEach((key) => {
      if (
        this.props.bookShelves[key].volume.find((element) => {
          return element.id === this.props.volume.id
        })
      ) {
        this._currentShelf = this.props.bookShelves[key];
        inShelf = true;
      }
    })
    if (!inShelf) {
      this._currentShelf = null;
    }
    this.forceUpdate();
  }

  selectShelf(event: any) {
    const shelfKey = event.target.getAttribute('data-type');
    if (this._currentShelf && this._currentShelf.title === shelfKey) {
      return;
    }
    if (shelfKey === '-1') {
      this.props.removeFromShelfRequest({
        bookId: this.props.volume.id,
        shelf: this._currentShelf,
      });
      return;
    }
    this._currentShelf = this.props.bookShelves[shelfKey];
    this.props.addToShelfRequest({
      book: this.props.volume,
      shelf: this.props.bookShelves[shelfKey]
    })
  }

  viewChanges() {
    const location = history.location.pathname;
    if (location === PATHS.PROFILE) { this._showCurrent = false };
  }

  render() {
    let options = [];
    let inList = false;

    for (const key in this.props.bookShelves) {
      if (
        this._currentShelf &&
        this.props.bookShelves[key].id === this._currentShelf.id
      ) {
        inList = true;
        if (this._showCurrent) {
          options.unshift(
            <button data-type={null} key={key} onClick={this.selectShelf.bind(this)} className="selected">
              {key}
            </button>
          );
        }
      } else {
        options.push(
          <button data-type={key} key={key} onClick={this.selectShelf.bind(this)}>{key}</button>
        );
      }
    }

    if (!inList) {
      options.unshift(
        <button data-type={null} key='-1' className="inactive add">Add to list</button>
      )
    }
    if (this._currentShelf) {
      options.push(
        <button data-type="-1" key='0' onClick={this.selectShelf.bind(this)}>Remove from {this._currentShelf.title}</button>
      )
    }

    if (!this.props.logged) {
      return <div></div>
    }

    return (
      <div className="select-container">
        <div data-type="select-shelf" className="select-shelf">
          {options}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  logged: state.auth.isLogged,
  bookShelves: state.profile.bookShelves
});

export default connect(
  mapStateToProps,
  {
    addToShelfRequest,
    removeFromShelfRequest
  },
)(AddBookToShelf)


