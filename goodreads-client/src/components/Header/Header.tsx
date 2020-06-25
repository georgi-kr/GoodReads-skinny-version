import React from 'react';

import Logo from './Logo';
import Nav from './Nav';
import SearchBar from './SearchBar';

const Header = () => {
  return(
    <header>
      <Logo />
      <SearchBar />
      <Nav />
    </header>
  )
}

export default Header;