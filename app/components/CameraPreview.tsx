import { Button, Dialog, makeStyles } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import storage from 'electron-json-storage';
import Postavke from '../types/Postavke';
import dbnames from '../db/dbnames';

const convertFileToBase64 = (file: any) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			if (reader.result) resolve(reader.result.toString());
		};
		reader.onerror = reject;
	});

interface Props {
	isOpen: boolean;
	imageSource: string;
	setImageSource: (val: string) => void;
	onClose: () => void;
}

function CameraPreview(props: Props) {
	const classes = useStyles();
	const [parametri, setParametri] = React.useState<Postavke | undefined>();
	storage.get(dbnames.postavke, (err, data) => {
		setParametri(Postavke.fromJSON(data));
	});
	const onImageCapture = React.useCallback(() => {
		if (
			parametri &&
			parametri.cameraIp &&
			parametri.cameraChannel &&
			parametri.cameraPassword &&
			parametri.cameraUsername
		) {
			axios
				.get(`http://${parametri!.cameraIp}/ISAPI/Streaming/channels/${parametri!.cameraChannel}/picture`, {
					headers: {
						Authorization: 'Basic ' + btoa(`${parametri!.cameraUsername}:${parametri!.cameraPassword}`),
					},
					responseType: 'blob',
				})
				.then(res => {
					convertFileToBase64(res.data).then((as: any) => {
						props.setImageSource(as);
					});
				})
				.catch(console.log);
		}
	}, [props.setImageSource]);

	React.useEffect(() => {
		setTimeout(() => {
			if (
				parametri &&
				parametri.cameraIp &&
				parametri.cameraChannel &&
				parametri.cameraPassword &&
				parametri.cameraUsername
			) {
				var canvas = document.getElementById('camera');
				try {
					//@ts-ignore
					var player = new JSMpeg.Player('ws://127.0.0.1:9999', { canvas: canvas, autoplay: true });
					if (props.imageSource !== '' && !props.isOpen) {
						player.destroy();
					}
				} catch (e) {
					console.log(e);
				}
			}
		}, 200);
	}, [props.isOpen, props.imageSource]);

	return (
		<Dialog open={props.isOpen} onBackdropClick={props.onClose} PaperProps={{ style: { maxWidth: '2000px' } }}>
			<div className={classes.buttonWrapper}>
				<Button onClick={props.onClose} className={classes.button} variant="contained" color="primary">
					Izađi
				</Button>

				{parametri &&
				parametri.cameraIp &&
				parametri.cameraChannel &&
				parametri.cameraPassword &&
				parametri.cameraUsername ? (
					props.imageSource === '' ? (
						<Button className={classes.button} onClick={onImageCapture} variant="contained" color="primary">
							Uslikaj
						</Button>
					) : (
						<Button
							className={classes.button}
							onClick={() => props.setImageSource('')}
							variant="contained"
							color="primary">
							Ponovno Uslikaj
						</Button>
					)
				) : null}
				{props.imageSource ? (
					<Button className={classes.button} onClick={props.onClose} variant="contained" color="primary">
						Spremi
					</Button>
				) : null}
			</div>
			{parametri &&
			parametri.cameraIp &&
			parametri.cameraChannel &&
			parametri.cameraPassword &&
			parametri.cameraUsername ? (
				props.imageSource !== '' ? (
					<img src={props.imageSource} width="1280" height="680" />
				) : (
					<canvas id="camera" width="1280" height="680" />
				)
			) : (
				<div
					style={{
						width: '1280px',
						height: '680px',
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex',
					}}>
					<span>Molimo vas podesite postavke kamere</span>
				</div>
			)}
		</Dialog>
	);
}

const useStyles = makeStyles(() => ({
	buttonWrapper: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'transparent',
		justifyContent: 'center',
	},
	button: {
		marginRight: '20px',
	},
}));

export default CameraPreview;
