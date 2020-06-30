import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from "../../store/actions/auth.action"

type LogoutProps = {
  logout: Function
}

class Logout extends Component<LogoutProps, {}> {

  loginResponseHandler = () => {
    this.props.logout()
  }

  render() {
    return (
      <button
        className="social-button"
        id="google-connect"
        onClick={this.loginResponseHandler}
      >
        Logout
      </button>
    )
  }
}

export default connect(null, { logout })(Logout);
