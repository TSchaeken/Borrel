import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { updateInfo } from '../../modules/user';

const styles = {
  bodyStyle: {
    paddingTop: '15vh',
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
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
};

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false };
  }

  onSubmit(values) {
    values.id = this.props.id;
    this.props.updateInfo(values);
    this.setState({ submitted: true });
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
    const firstName = this.props.firstName;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div style={styles.bodyStyle}>
        {this.state.submitted ? (
          !firstName ? (
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
            <div>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  image="https://picsum.photos/200/?random"
                  title="Random Placeholder"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {this.props.user.firstName} {this.props.user.lastName}
                  </Typography>
                  <Typography component="p">Email: {this.props.user.email}</Typography>
                  <Typography component="p">Profession: {this.props.user.profession}</Typography>
                  <Typography component="p">
                    {this.props.user.firstName} is currently seeking {this.props.user.seeking}
                  </Typography>
                  <Typography component="p">
                    {this.props.user.firstName} had this to add: {this.props.user.note}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Contact
                  </Button>
                  <Button size="small" color="primary">
                    More info
                  </Button>
                </CardActions>
              </Card>
            </div>
          )
        ) : (
          <Paper elevation={3}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} style={styles.form}>
              <h2>Update your information</h2>
              <div>
                <Field
                  name="firstname"
                  component={this.renderTextField}
                  label="First name"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="lastname"
                  component={this.renderTextField}
                  label="Last name"
                  type="text"
                />
              </div>
              <div>
                <Field name="email" component={this.renderTextField} label="email" type="email" />
              </div>
              <div>
                <Field
                  name="profession"
                  component={this.renderTextField}
                  label="profession"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="interests"
                  component={this.renderTextField}
                  label="Interests"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="seeking"
                  component={this.renderTextField}
                  label="seeking"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="note"
                  component={this.renderTextField}
                  label="note - anything else you want to add"
                  type="text"
                  multiline={true}
                  rows={5}
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
  id: state.authenticated.user.id,
  name: state.authenticated.user.name,
  firstName: state.user.user.firstName,
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateInfo
    },
    dispatch
  );

function validate(values) {
  const errors = {};
  const requiredFields = [
    'firstname',
    'lastname',
    'email',
    'profession',
    'interests',
    'seeking',
    'note'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true;
    }
  });
  console.log(errors);
  return errors;
}

export default reduxForm({ form: 'UserInfoForm', validate })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserInfo)
);
