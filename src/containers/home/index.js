import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { login, logout, checkSesh } from '../../modules/auth';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IntroImage from '../../images/intro.jpg';
import FirstImage from '../../images/first.jpg';
import ContentImage from '../../images/connections.jpg';
import Typography from '@material-ui/core/Typography';
const styles = {
  paperContainer1: {
    background: `url(${IntroImage}) no-repeat center center fixed`,
    height: `100vh`,
    width: `100%`,
    backgroundSize: `cover`
  },
  paperContainer2: {
    background: `url(${FirstImage}) no-repeat center center fixed`,
    height: `100vh`,
    width: `100%`,
    backgroundSize: `cover`
  },
  infoContainerImage: {
    background: `url(${ContentImage}) no-repeat fixed`,
    width: `100%`,
    height:`100%`,
    backgroundAttachment: `local`,
    backgroundSize: `cover`
  },
  title: {
    color: '#FE6B8B',
    fontSize: '20rem',
    backgroundColor: 'rgba(0, 0, 0, 0.35)'
  },
  title_wrapper: {
    height: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`
  },
  firstsection: {
    height: `50vh`,
    width: `100%`,
    backgroundColor: '#FFF',
    display: `flex`
  },
  infotextwrapper: {
    height: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`
  },
  infotext: {
    fontSize: `1rem`,
    padding: `0px 20px`
  }
};

class Home extends Component {
  componentWillMount() {
    this.props.checkSesh();
  }
  render() {
    return (
      <div style={{ paddingTop: '7vh' }}>
        <div>
        <Paper style={styles.paperContainer1}>
          <Grid container style={styles.title_wrapper}>
            <Typography style={styles.title} variant='display4'>
              borrel.
            </Typography>
          </Grid>
        </Paper>
        </div>
        <div style={styles.firstsection}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <img style={styles.infoContainerImage} alt="People working"/>
            </Grid>
            <Grid item xs={12} sm={6} style={styles.infotextwrapper}>
              <Typography style={styles.infotext} variant='body1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, debitis. Nostrum
                laboriosam voluptatem nam obcaecati deserunt odio aspernatur quae quia, esse numquam
                animi quibusdam aut modi ullam. Eveniet iste accusantium voluptas asperiores nisi
                tempora unde minus odio. Dicta quae aliquam officia itaque maxime quis sunt minus.
                Autem vel modi vitae possimus quod eveniet mollitia corrupti alias quae! Voluptatem
                voluptatibus assumenda nulla delectus maxime! Quasi, pariatur sunt doloremque autem,
                laborum natus voluptatibus labore mollitia ipsum minus commodi, amet molestiae vel
                quia reprehenderit sint repellat alias aliquid nulla. Enim laborum corrupti minima
                quaerat sint accusantium incidunt reiciendis perspiciatis vitae. Modi, corporis
                maiores!
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Paper style={styles.paperContainer2}>
          <Grid container style={styles.title_wrapper}>
            <Typography style={styles.title} variant='display3'>
              borrel.
            </Typography>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authenticated.loggedIn,
  request: state.authenticated.request
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      checkSesh,
      login,
      logout,
      changePage: () => push('/user')
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

//rgb(241,242,247)
