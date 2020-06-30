import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import { LABELS } from '../../constants/labels.constant';
import { searchBooksRequest } from '../../store/actions/books.action'
import searchIcon from '../../assets/icons/search-icon.png';
import history from '../../shared/history';
import { PATHS } from '../../constants/paths.constant';

type SearchBarProps = {
  searchBooksRequest: Function;
} & RouteComponentProps;

class SearchBar extends Component<SearchBarProps, {}> {
  searchBooksHandler = (event: any) => {
    event.preventDefault();
    if (!event.target[0].value) {
      return;
    }
    this.props.searchBooksRequest(event.target[0].value);
    history.push(PATHS.SEARCH);
  }

  render() {
    return (
      <div className="search-bar-container">
        <form className="center-items" onSubmit={this.searchBooksHandler}>
          <input type="text" placeholder={LABELS.SEARCH} className="search" />
          <button type="submit">
            <img src={searchIcon} className="icon" alt="search-icon" />
          </button>
        </form>
      </div>
    )
  }
}

const withRedirectionSearch = withRouter(SearchBar)

export default connect(null, { searchBooksRequest })(withRedirectionSearch);

