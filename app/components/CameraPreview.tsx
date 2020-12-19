import { Button, Dialog, makeStyles } from '@material-ui/core';
import React from 'react';
import axios from 'axios';

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
	const onImageCapture = React.useCallback(() => {
		axios
			.get('http://192.168.1.100/ISAPI/Streaming/channels/1/picture', {
				headers: {
					Authorization: 'Basic ' + btoa('admin:Admin12345'),
				},
				responseType: 'blob',
			})
			.then(res => {
				convertFileToBase64(res.data).then((as: any) => {
					props.setImageSource(as);
				});
			})
			.catch(console.log);
	}, [props.setImageSource]);

	React.useEffect(() => {
		setTimeout(() => {
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
		}, 200);
	}, [props.isOpen, props.imageSource]);

	return (
		<Dialog open={props.isOpen} onBackdropClick={props.onClose} PaperProps={{ style: { maxWidth: '2000px' } }}>
			<div className={classes.buttonWrapper}>
				<Button onClick={props.onClose} className={classes.button} variant="contained" color="primary">
					Izađi
				</Button>

				{props.imageSource === '' ? (
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
				)}
				{props.imageSource ? (
					<Button className={classes.button} onClick={props.onClose} variant="contained" color="primary">
						Spremi
					</Button>
				) : null}
			</div>
			{props.imageSource !== '' ? (
				<img src={props.imageSource} width="1280" height="680" />
			) : (
				<canvas id="camera" width="1280" height="680" />
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
