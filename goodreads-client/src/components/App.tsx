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
import BookDetails from './Books/BookDetails';
import Profile from './Profile/Profile';

type AppProps = {
  isLogged: boolean
};
type AppState = any;

class App extends Component<AppProps, AppState> {

  render() {
    return (
      <Router history={history}>
        <Header isLogged={this.props.isLogged} />
        <main>
          <Route exact path={PATHS.HOME} component={Landing} />
          <Route exact path={PATHS.SEARCH} component={SearchedBookResults} />
          <Route exact path={PATHS.PROFILE} component={Profile} />
          <Route exact path={`${PATHS.DETAILS}/:id`} component={BookDetails} />
        </main>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isLogged: state.auth.isLogged
});

export default connect(
  mapStateToProps,
  {},
)(App)
