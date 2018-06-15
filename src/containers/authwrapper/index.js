import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function requireAuth(WrappedComponent) {
  class Authentication extends Component {
    render() {

      if (!this.props.loggedIn) {
        return <Redirect to="/" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ authenticated }) {
    return { loggedIn: authenticated.loggedIn };
  }

  return connect(mapStateToProps)(Authentication);
}
