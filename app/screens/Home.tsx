/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import fs from 'fs';
import axios from 'axios';
import storage from 'electron-json-storage';
import dbnames from '../db/dbnames';
import Postavke from '../types/Postavke';

const { app } = require('electron').remote;

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));
const { getCurrentWebContents } = require('electron').remote;

const webContents = getCurrentWebContents();
const password = '3101';

function HomeScreen() {
	const [counter, setCounter] = React.useState(0);
	const { height, width } = useWindowDimensions();
	const classes = useStyles();

	React.useEffect(() => {
		const dir = app.getPath('appData') + '/plates-images';
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
	}, []);

	React.useEffect(() => {
		storage.get(dbnames.postavke, (err, data) => {
			const postavke = Postavke.fromJSON(data);
			if (
				postavke &&
				postavke.cameraIp &&
				postavke.cameraChannel &&
				postavke.cameraPassword &&
				postavke.cameraUsername
			) {
				axios.get(
					`http://127.0.0.1:1024/change?url=rtsp://${postavke.cameraUsername}:${postavke.cameraPassword}@${postavke.cameraIp}:554/Streaming/Channels/10${postavke.cameraChannel}`
				);
			}
		});
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
			<Button style={{ position: 'absolute', right: 0, top: '5vh' }} onClick={() => setCounter(counter + 1)} />
		</div>
	);
}

export default HomeScreen;
