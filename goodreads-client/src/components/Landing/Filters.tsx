import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store/reducers/root.reducer';
import { selectGenre } from '../../store/actions/books.action'
import { GENRES } from '../../constants/genres.constant'

type FiltersProps = {
  selectGenre: Function,
  selectedGenreData: string
}

type FiltersState = {
  selectedGenreData: string
}

class Filters extends Component<FiltersProps, FiltersState> {
  selectGenreHandler = (event: any) => {
    this.props.selectGenre(event.target.innerHTML);
  }

  render() {
    return (
      <ul className="filters-container">
        {GENRES.map((genre, index) => {
          return (
            <li
              key={index}
              onClick={this.selectGenreHandler}
              className={`filter-tab ${this.props.selectedGenreData === genre ? 'active' : ''}`}
            >
              {genre}
            </li>
          );
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedGenreData: state.books.selectedGenre,
});


export default connect(mapStateToProps, { selectGenre })(Filters);
