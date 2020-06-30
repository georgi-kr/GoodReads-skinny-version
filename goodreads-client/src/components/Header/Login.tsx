import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux';

import { loginResponse } from "../../store/actions/auth.action"
import { ENVIROMENT } from '../../config/enviroment';

type LoginProps = {
  loginResponse: Function
}

class Login extends Component<LoginProps, {}> {

  loginResponseHandler = (response: any) => {
    this.props.loginResponse({
      result: response,
      errors: response.error
    })
  }

  render() {
    return (
      <GoogleLogin
        clientId={ENVIROMENT.CLIENT_ID}
        render={renderProps => (
          <button
            className="social-button"
            id="google-connect"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Google Login
          </button>
        )}
        buttonText="Login"
        onSuccess={this.loginResponseHandler}
        onFailure={this.loginResponseHandler}
        scope={ENVIROMENT.SCOPE}
        cookiePolicy={'single_host_origin'}
      />
    )
  }
}

export default connect(null, { loginResponse })(Login);
