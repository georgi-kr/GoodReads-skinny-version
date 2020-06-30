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
  constructor(props: AddBookToShelfProps) {
    super(props)
  }

  _currentShelf: Shelf = null;
  _showCurrent = true;

  componentWillReceiveProps() {
    if (!this.props.logged || !this.props.bookShelves) {
      return;
    }
    this.viewChanges();
    this.findBookOwnShelf();
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
    console.log(this.props.bookShelves)
    console.log('view updated')
    let options = [];
    let inList = false;
    for (const key in this.props.bookShelves) {
      if (
        this._currentShelf &&
        this.props.bookShelves[key].id === this._currentShelf.id
        ) {
          inList = true;
          if(this._showCurrent) {
            options.unshift(
              <div data-type={null} key={key} onClick={this.selectShelf.bind(this)} className="inactive">
                Current list: {key}
              </div>
            );
          }
      } else {
        options.push(
          <div data-type={key} key={key} onClick={this.selectShelf.bind(this)}>{key}</div>
        );
      }
    }
    if (!inList) {
      options.unshift(
        <div data-type={null} key='-1' className="inactive">Add to list</div>
      )
    }
    if (this._currentShelf) {
      options.push(
        <div data-type="-1" key='0' onClick={this.selectShelf.bind(this)}>Remove from {this._currentShelf.title}</div>
      )
    }

    if (!this.props.logged) {
      return <div></div>
    }

    return (
      <div className="select-container" id="select-form">
        <div data-type="select-shelf">
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


