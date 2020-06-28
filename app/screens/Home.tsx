/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import logo from '../assets/home.png';

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
      <img width="100%" height="100%" src={logo} />
    </div>
  );
}

export default HomeScreen;
