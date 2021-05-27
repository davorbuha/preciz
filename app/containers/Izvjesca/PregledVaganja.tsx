/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import storage from 'electron-json-storage';
import { Moment } from 'moment';
import PregledVaganjaScreen from '../../screens/Izvjesca/PregledVaganjaScreen';
import dbnames from '../../db/dbnames';
import PrvoVaganje from '../../types/PrvoVaganje';
import DrugoVaganje from '../../types/DrugoVaganje';
import JednoVaganje from '../../types/JednoVaganje';
import Vozilo from '../../types/Vozilo';
import Roba from '../../types/Roba';
import Partner from '../../types/Partner';

export type PregledType = {
	id: string;
	tip: string;
	brojVaganja?: number;
	registracija: string;
	prikolica: string;
	vozac: string;
	roba: string;
	dobavljac: string;
	sifraRobe: string;
	mjestoIsporuke: string;
	brojNaloga: string;
	bruto: number;
	neto: number;
	tara: number;
	ts1: Moment;
	ts2: Moment;
};

function PregledVaganjaContainer() {
	const [prvaVaganja, setPrvaVaganja] = useState<PrvoVaganje[]>([]);
	const [drugaVaganja, setDrugaVaganja] = useState<DrugoVaganje[]>([]);
	const [jednaVaganja, setJednaVaganja] = useState<JednoVaganje[]>([]);
	const [vozila, setVozila] = useState<Vozilo[]>([]);
	const [roba, setRoba] = useState<Roba[]>([]);
	const [kupci, setKupci] = useState<Partner[]>([]);

	React.useEffect(() => {
		storage.get(dbnames.vozila, (err, data) => {
			if (Array.isArray(data)) {
				const vozilaTemp = data.map(Vozilo.fromJSON);
				vozilaTemp.unshift(new Vozilo('0', 'sva vozila', '0', '0'));
				setVozila(vozilaTemp);
			} else {
				setVozila([new Vozilo('0', 'sva vozila', '0', '0')]);
			}
		});
		storage.get(dbnames.roba, (err, data) => {
			if (Array.isArray(data)) {
				const robaTemp = data.map(Roba.fromJSON);
				robaTemp.unshift(new Roba('0', 'sva roba', '0', '0'));
				setRoba(robaTemp);
			} else {
				setRoba([new Roba('0', 'sva roba', '0', '0')]);
			}
		});
		storage.get(dbnames.partneri, (err, data) => {
			if (Array.isArray(data)) {
				const kupciTemp = data.map(Partner.fromJSON);
				kupciTemp.unshift(new Partner('0', '0', 'svi partneri', '0', '0', '0', '0', '0', '0'));
				setKupci(kupciTemp);
			} else {
				setKupci([new Partner('0', '0', 'svi partneri', '0', '0', '0', '0', '0', '0')]);
			}
		});
		storage.get(dbnames.prvoVaganje, (err, prvaTemp) => {
			storage.get(dbnames.jednoVaganje, (err, jednaTemp) => {
				storage.get(dbnames.drugoVaganje, (err, drugaTemp) => {
					if (Array.isArray(drugaTemp)) {
						setDrugaVaganja(drugaTemp.map(DrugoVaganje.fromJSON));
					}
					if (Array.isArray(prvaTemp)) {
						setPrvaVaganja(prvaTemp.map(PrvoVaganje.fromJSON));
					}
					if (Array.isArray(jednaTemp)) {
						setJednaVaganja(jednaTemp.map(JednoVaganje.fromJSON));
					}
				});
			});
		});
	}, []);
	React.useEffect(() => {
		console.log(prvaVaganja);
	}, [prvaVaganja]);
	const vaganja = React.useMemo(() => {
		const prvaIDrugaConst = prvaVaganja
			.filter(item => item.drugoVaganjeId)
			.map(prvo => {
				const drugo = drugaVaganja.find(drugoI => drugoI.id === prvo.drugoVaganjeId)!;
				return {
					brojVaganja: prvo.brojVaganja,
					id: prvo.id,
					tip: prvo.tip,
					registracija: prvo.registracija,
					prikolica: prvo.prikolica,
					vozac: prvo.vozac,
					roba: prvo.roba,
					sifraRobe: prvo.sifraRobe,
					mjestoIsporuke: prvo.mjestoIsporuke,
					brojNaloga: prvo.brojNaloga,
					bruto: drugo.bruto,
					neto: drugo.neto,
					tara: drugo.tara,
					ts1: prvo.ts,
					ts2: drugo.ts,
					dobavljac: prvo.dobavljac,
				} as PregledType;
			});
		const jednaVaganjaConst = jednaVaganja.map(
			item =>
				({
					id: item.id,
					tip: item.tip,
					registracija: item.registracija,
					prikolica: item.prikolica,
					vozac: item.vozac,
					roba: item.roba,
					sifraRobe: '',
					mjestoIsporuke: item.mjestoIsporuke,
					brojNaloga: item.brojNaloga,
					bruto: item.bruto,
					neto: item.neto,
					tara: item.tara,
					ts1: item.ts,
					ts2: item.ts,
					dobavljac: item.dobavljac,
				} as PregledType)
		);
		return [...prvaIDrugaConst, ...jednaVaganjaConst];
	}, [prvaVaganja, drugaVaganja, jednaVaganja]);
	return (
		<PregledVaganjaScreen
			removeJednoArr={(ids: string[]) => {
				setJednaVaganja(jednaVaganja.filter(item => !ids.find(i => i === item.id)));
			}}
			removePrvoArr={(ids: string[]) => {
				setPrvaVaganja(prvaVaganja.filter(item => !ids.find(i => i === item.id)));
			}}
			removeJednoVaganje={(id: string) => {
				setJednaVaganja(jednaVaganja.filter(item => item.id !== id));
			}}
			removePrvoVaganje={(id: string) => {
				setPrvaVaganja(prvaVaganja.filter(item => item.id !== id));
			}}
			kupci={kupci}
			roba={roba}
			vozila={vozila}
			vaganja={vaganja}
		/>
	);
}

export default PregledVaganjaContainer;
