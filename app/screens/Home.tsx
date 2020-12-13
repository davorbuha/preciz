/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import logo from '../assets/home.png';
import { Nvr, SuperRender } from 'hikvision-api';

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
  React.useEffect(() => {
    const nnnn = new Nvr({
      ip: '192.168.1.100',
      user: 'admin',
      password: 'Admin12345',
      // proxy: 'http://127.0.0.1:8080',
      version: 2,
      wasmUrl: 'http://localhost:9990/Decoder.wasm',
      port: 80,
      channelOffset: 0
    });
    const renderer = new SuperRender(document.getElementById('chanel1'));
    nnnn.connect().then(() => {
      const channel = nnnn.getChannelConnect();
      channel.init().then(() => {
        channel.addEventListener('video', a => {
          renderer.displayFrameData(a.data);
        });
      });
    });
    nnnn.getChannelConnect();
  }, []);
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
      {/* <img
        src="http://192.168.1.100/Streaming/channels/102/httpPreview"
        width="640"
        height="360"
      /> */}
      <canvas id="chanel1" width="1280" style={{}} height="720" />
    </div>
  );
}

export default HomeScreen;
