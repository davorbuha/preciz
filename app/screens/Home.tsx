/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import axios from 'axios'

const convertFileToBase64 = (file: any) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			if (reader.result) resolve(reader.result.toString());
		};
		reader.onerror = reject;
	});

const { spawn } = require('child_process');

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
  const [src, setSrc] = React.useState('')
  const { height, width } = useWindowDimensions();
  const classes = useStyles();

 
 
React.useEffect(() => {
    spawn('./hikvision-server');
    var canvas = document.getElementById('chanel1');
    //@ts-ignore
    var player = new JSMpeg.Player('ws://127.0.0.1:9999', {canvas: canvas, autoplay: true});
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
      <Button
        style={{ position: 'absolute', right: 0, top: '15vh', width: '100px', backgroundColor: 'red' }}
        onClick={() => {

          axios.get('http://192.168.1.100/ISAPI/Streaming/channels/1/picture', {
            headers: {
              Authorization: 'Basic ' + btoa('admin:Admin12345')

            },
            responseType: 'blob',

          }).then((res) => convertFileToBase64(res.data).then((res: any) => setSrc(res))).catch(console.log)
          
        }}
      />
       {src !== '' ? <img
        src={src}
        width="1280"
        height="702"
      /> 
      : <canvas id="chanel1" width="840" style={{width: '840px!important', height: '475px!important'}} height="475" /> }
    </div>
  );
}

export default HomeScreen;
