import React, { Component } from 'react';

import Logo from './Logo';
import Nav from './Nav';
import SearchBar from './SearchBar';
import Login from './Login';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/paths.constant';

type HeaderProps = {
  isLogged: boolean
}

class Header extends Component<HeaderProps, {}> {
  showButton = () => {
    if (this.props.isLogged) {
      return (
        <div className="center-items">
          <Nav />
          <Logout />
        </div>
      )
    } else {
      return <Login />
    }
  }

  render() {
    return (
      <header>
        <Link to={PATHS.HOME}>
          <Logo />
        </Link>
        <SearchBar />
        {this.showButton()}
      </header>
    )
  }
}

export default Header;