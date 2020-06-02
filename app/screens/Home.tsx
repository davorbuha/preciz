import React from 'react';
import { makeStyles } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import { Link } from 'react-router-dom';
import { RoutesEnum } from '../routes';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const classes = useStyles();
  return (
    <div className={classes.container} style={{ width, height }}>
      <p style={{ color: 'red' }}>Hello from HomeScreen</p>
      <Link to={RoutesEnum.ArhiviranjeBaze}>aaaaaa</Link>
    </div>
  );
}

export default HomeScreen;
