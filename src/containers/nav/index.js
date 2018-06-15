import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, login } from '../../modules/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  AppBarColor: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: `7vh`,
    position: `fixed`,
    minHeight: '65px'
  }
};

class Nav extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div style={styles.root}>
        <AppBar position="static" style={styles.AppBarColor}>
          <Toolbar>
            <IconButton
              style={styles.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {this.props.loggedIn ? (
                <header className="App-header">
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/">
                      <Button variant="outlined">Home</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/user">
                      <Button variant="outlined">User</Button>
                    </Link>
                  </MenuItem>
                </header>
              ) : (
                <header className="App-header">
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/">
                      <Button variant="outlined">Home</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/signup">
                      <Button variant="outlined">Sign Up</Button>
                    </Link>
                  </MenuItem>
                </header>
              )}
            </Menu>
            {this.props.name ? (
              <Typography variant="title" color="inherit" style={styles.flex}>
                Welcome back {this.props.name}
              </Typography>
            ) : (
              <Typography variant="title" color="inherit" style={styles.flex}>
                Welcome stranger
              </Typography>
            )}

            {!this.props.loggedIn ? (
              <Link to="/login" style={{ textDecoration: 'none', color: '#FFF' }}>
                <Button color="inherit">Login</Button>
              </Link>
            ) : (
              <Button color="inherit" onClick={() => this.props.logout()}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authenticated.loggedIn,
  name: state.authenticated.user.name
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

// {
//   this.props.loggedIn ? (
//     <header className="App-header">
//       <Link to="/">
//         <Button variant="outlined">Home</Button>
//       </Link>
//       <Link to="/user">
//         <Button variant="outlined">User</Button>
//       </Link>
//       <Button variant="outlined" onClick={() => this.props.logout()}>
//         Log Out
//       </Button>
//     </header>
//   ) : (
//     <header className="App-header">
//       <Link to="/">
//         <Button variant="outlined">Home</Button>
//       </Link>
//       <Link to="/user">
//         <Button variant="outlined">User</Button>
//       </Link>
//       <Link to="/signup">
//         <Button variant="outlined">Sign Up</Button>
//       </Link>
//     </header>
//   );
// }
