import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import {retrieveUsers} from '../../modules/user'

const styles = {
  bodyStyle: {
    paddingTop: `7vh`,
    height: `50vh`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`
  },
  bodyContent: {
    padding: `20px 0px`
  }
};

class User extends Component {


  HandleClick(){
    this.props.retrieveUsers()
  }


  render() {
    return (
      <div>
        <Paper style={styles.bodyStyle} elevation={0}>
          <Grid>
            <Typography variant="display2">Hey there {this.props.user.name}</Typography>
            <Typography variant="body2" style={styles.bodyContent}>
              There's a few things you can do on this page. First up, make sure you've updated your
              user information:
            </Typography>
            <Link to="/userinfo" style={{ textDecoration: 'none', color: '#000' }}>
              <Button color="inherit" variant="outlined">
                Update Info
              </Button>
            </Link>
            <Typography variant="body2" style={styles.bodyContent}>
              Next up, check your links. Remember, these are influenced by both the data you've
              entered, as well as Borrel itself.
            </Typography>
            <Link to="/retrieve" style={{ textDecoration: 'none', color: '#000' }}>
              <Button color="inherit" variant="outlined" onClick={()=>this.HandleClick()}>
                Connect
              </Button>
            </Link>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      retrieveUsers,
      changePage: () => push('/')
    },
    dispatch
  );

const mapStateToProps = state => ({
  user: state.authenticated.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
