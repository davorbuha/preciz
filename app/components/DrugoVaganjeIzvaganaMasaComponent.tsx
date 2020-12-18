/* eslint-disable prefer-template */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { History } from 'history';
import colors from '../styles/colors';
import { RoutesEnum } from '../routes';
import PrvoVaganje from '../types/PrvoVaganje';

interface Props {
	prvoVaganje: PrvoVaganje;
	vrijednostVage: string;
	mirnaVaga: boolean;
	brutto: number;
	neto: number;
	tara: number;
	history: History;
	imageSource: string;
	handleSpremiPress: () => void;
}

function DrugoVaganjeIzvaganaMasaComponent(p: Props) {
	return (
		<div
			style={{
				flex: 1,
				justifyContent: 'space-between',
				display: 'flex',
				flexDirection: 'column',
				marginTop: 30,
				marginLeft: 20,
				borderWidth: '2px',
				borderColor: colors.primary,
				borderStyle: 'solid',
				width: '100%',
				padding: 10,
			}}>
			<div>
				<p>Izvagana masa je: {p.vrijednostVage}</p>
				<p style={{ fontSize: 16, margin: '10px 0px' }}>{p.mirnaVaga ? 'Vaga je mirna' : 'Vaga nije mirna'}</p>
				<div
					style={{
						marginTop: 10,
						display: 'flex',
						height: 70,
						flexFlow: 'column',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}>
					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							height: 36,
							fontSize: 20,
							marginTop: 20,
						}}>
						Brutto: {p.brutto}
					</span>
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 15,
						}}>
						<span style={{ fontSize: 20 }}>Tara: {p.tara}</span>
					</div>
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 15,
						}}>
						<span style={{ fontSize: 20 }}>Neto: {p.neto}</span>
					</div>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					alignSelf: 'flex-end',
					justifyContent: 'space-between',
					width: '100%',
				}}>
				<Button onClick={() => p.history.push(RoutesEnum.Home)} variant="contained" color="secondary">
					Prekini
				</Button>
				<Button disabled={!p.mirnaVaga} onClick={p.handleSpremiPress} variant="contained" color="primary">
					Spremi Vaganje
				</Button>
			</div>
		</div>
	);
}

export default withRouter<any, any>(DrugoVaganjeIzvaganaMasaComponent);
