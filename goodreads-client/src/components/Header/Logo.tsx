import React from 'react';

import logoIcon from '../../assets/icons/logo-home.png';

const Logo = () => {
  return (
    <div className="logo-container center">
      <img src={logoIcon} className="logo-img" alt="logo"/>
      <span className="logo-text" >BestReads</span>
    </div>
  )
}

export default Logo;