import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import { retrieveUsers } from '../../modules/user';

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
    maxWidth: 345,
    margin: '0 50px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
};

class RetrievedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false };
  }

  renderCard(peopleData) {
    console.log(peopleData)
    
    
    
    return(
      <Grid item xs={4} key={peopleData.firstName}>
        <Card style={styles.card}>
          <CardMedia
            style={styles.media}
            image="https://picsum.photos/200/?random"
            title="Random Placeholder"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {peopleData.firstName} {peopleData.lastName}
            </Typography>
            <Typography component="p">Email: {peopleData.local.email}</Typography>
            <Typography component="p">Profession: {peopleData.local.profession}</Typography>
            <Typography component="p">
              {peopleData.firstName} is currently seeking {peopleData.local.seeking}
            </Typography>
            <Typography component="p">
              {peopleData.firstName} had this to add: {peopleData.local.note}
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
      </Grid>
    );
  }

  render() {
    const request = this.props.request;
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
          <Grid container>{this.props.seeking.map(this.renderCard)}</Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  request: state.user.request,
  seeking: state.user.seeking
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      retrieveUsers
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetrievedUsers);
