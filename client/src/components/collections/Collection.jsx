import React, { Component } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import collections from '../../images/collections/collections';

const Container = styled.div`
  width: 95%;
  max-width: 1124px;
  margin: auto;
  padding: 40px;
  background: white;
  h1 {
    margin: 1em 0;
  }
  h2 {
    margin: 0.5em 0 0 0;
  }
`;

const styles = {
  gridImg: {
    transition: 'all 0.3s',
    transform: 'scale(0.98)',
    '&:hover': {
      transform: 'translateY(-2px) scale(1)',
      boxShadow: '0px 7px 19px -3px rgba(0,0,0,0.75)'
      // '& + h2': {
      //   textDecoration: 'underline'
      // }
    }
  }
};

class Collections extends Component {
  state = {
    collection: null,
    match: null
  };
  componentWillMount() {
    this.setState({
      collection: collections.filter(
        col => col.title === this.props.match.params.title
      )[0],
      match: this.props.match
    });
  }
  render() {
    const { classes } = this.props;
    const { collection } = this.state;
    return (
      <Container>
        <Typography
          align="center"
          variant="display2"
          style={{ marginTop: '1.8em' }}
        >
          {collection.title}
        </Typography>
        {collection.images.map(imageObj => {
          return (
            <div key={JSON.stringify(imageObj)}>
              <img
                src={imageObj.image}
                alt={collection.title}
                style={{ width: '100%' }}
                className={classes.gridImg}
              />
              <Typography
                align="center"
                variant="title"
                style={{ fontWeight: 'bold' }}
              >
                {imageObj.caption}
              </Typography>
              <br />
              <br />
              <br />
            </div>
          );
        })}
        <br />
      </Container>
    );
  }
}

export default withStyles(styles)(Collections);
