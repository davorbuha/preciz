/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
const { getCurrentWebContents } = require('electron').remote;

const webContents = getCurrentWebContents();
const password = '3101';

function HomeScreen() {
  const [counter, setCounter] = React.useState(0);
  const { height, width } = useWindowDimensions();
  const classes = useStyles();

  return (
    <div className={classes.container} style={{ width, height }}>
      {counter > 5 ? (
        <input
          type="text"
          onChange={e => {
            if (e.target.value === password) {
              webContents.inspectElement(0, 0);
            }
          }}
        />
      ) : null}
      <Button
        style={{ position: 'absolute', right: 0, top: '5vh' }}
        onClick={() => setCounter(counter + 1)}
      />
      
      
    </div>
  );
}

export default HomeScreen;
