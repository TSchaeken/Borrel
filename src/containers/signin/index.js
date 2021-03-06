import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../modules/auth';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = {
  bodyStyle: {
    paddingTop: '7vh',
    height: `50vh`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`
  },
  buttonStyles: {
    padding: `20px 0px`
  },
  button: {
    marginLeft: `5px`
  },
  form: {
    padding: `30px 30px`
  },
  textfield: {
    width: `400px`
  }
};

class SignIn extends Component {
  onSubmit(values) {
    console.log(values);
    this.props.login(values);
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      label={label}
      error={touched && error}
      style={styles.textfield}
      {...input}
      {...custom}
    />
  );

  render() {
    const request = this.props.request;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div style={styles.bodyStyle}>
        {request ? (
          <div>
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
          <Paper elevation={3}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} style={styles.form}>
              <h2>Sign In!</h2>
              <div>
                <Field
                  name="username"
                  component={this.renderTextField}
                  label="username"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="password"
                  component={this.renderTextField}
                  label="password"
                  type="password"
                />
              </div>
              <div style={styles.buttonStyles}>
                <Button
                  type="submit"
                  disabled={pristine || submitting}
                  variant={'outlined'}
                  style={styles.button}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                  variant={'outlined'}
                  style={styles.button}
                >
                  Clear Values
                </Button>
              </div>
            </form>
          </Paper>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  request: state.authenticated.request
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      changePage: () => push('/')
    },
    dispatch
  );

function validate(values) {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true;
    }
  });
  console.log(errors)
  return errors;
}

export default reduxForm({ form: 'SignInForm', validate })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
