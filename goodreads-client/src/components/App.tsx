import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/components/App.scss';
import history from '../shared/history'
import { RootState } from '../store/reducers/root.reducer';
import { PATHS } from '../constants/paths.constant';
import Landing from './Landing/Landing';
import Header from './Header/Header';
import SearchedBookResults from './Books/SearchedBookResults';

type AppProps = any;
type AppState = any;

class App extends Component<AppProps, AppState> {

  componentDidMount() {

  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <main>
          <Route exact path={PATHS.HOME} component={Landing} />
          <Route exact path={PATHS.SEARCH} component={SearchedBookResults} />
        </main>
      </Router>
    );
  }
}

// You get state from dispatched actions
const mapStateToProps = (state: RootState) => ({
  //
});

export default connect(
  mapStateToProps,
  {},
)(App)
