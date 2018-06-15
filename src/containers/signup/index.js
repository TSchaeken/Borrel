import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signup } from '../../modules/signup';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import './signup.css';

class SignUp extends Component {
  enterField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input type="text" {...field.input} />
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.signup(values);
  }

  render() {
    const request = this.props.request;
    console.log(request);
    const { handleSubmit } = this.props;
    return (
      <div style={{ paddingTop: '7vh' }}>
        <h2>Sign up!</h2>
        {request ? (
          <div>
            <h2>Loading...</h2>
            <div className="cssload-bell">
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field label="Username" name="username" component={this.enterField} />
            <Field label="Password" name="password" component={this.enterField} />
            <button type="submit">Submit</button>
            <Link to="/">Return home</Link>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  request: state.signup.request
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signup,
      changePage: () => push('/')
    },
    dispatch
  );

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Enter a username!';
  }

  if (!values.password) {
    errors.password = "Don't forget your password!";
  }

  return errors;
}

export default reduxForm({ validate, form: 'LogInFormAttempt' })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);
