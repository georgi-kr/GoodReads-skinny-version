import React, { Component } from 'react';

import Filters from './Filters';
import NewestBooks from '../Books/NewestBooks';

type LandingProps = {};
type LandingState = {};

class Landing extends Component<LandingProps, LandingState> {

  render() {
    return (
      <div className="landing-container">
        <Filters />
        <div className="page-header center-items">
          <div className="page-title">
            New additions to our library
          </div>
        </div>
        <NewestBooks />
      </div>
    )
  }
}

export default Landing;