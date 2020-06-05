/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../useDimensions';
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
    </div>
  );
}

export default HomeScreen;
