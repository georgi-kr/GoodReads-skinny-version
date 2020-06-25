import React from 'react';

import { NAV_LINKS } from '../../constants/nav-links.constant';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className="nav-links-container">
        {NAV_LINKS.map((link) => {
          return (
            <Link to={link.path} key={link.name}>
              <li>
                {link.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  )
}

export default Nav;