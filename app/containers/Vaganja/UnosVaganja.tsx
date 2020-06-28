/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router';
import { History } from 'history';

import UnosVaganjaScreen from '../../screens/Vaganja/UnosVaganjaScreen';
import MainContext from '../../context/MainContext';
import Prikolica from '../../types/Prikolica';
import Vozilo from '../../types/Vozilo';
import Vozac from '../../types/Vozac';
import Roba from '../../types/Roba';
import Partner from '../../types/Partner';
import MjestoIsporuke from '../../types/MjestoIsporuke';
import dbnames from '../../db/dbnames';
import { RoutesEnum } from '../../routes';
import VaganjeSpremljenoModalUnos from '../../components/VaganjeSpremljenoModalUnos';

const app = require('electron').remote.app;

interface Props {
  history: History;
}

function UnosVaganjaContainer(props: Props) {
  const [showSpremljenoVaganje, setShowSpremljenoVaganje] = React.useState(
    false
  );
  const [vozila, setVozila] = React.useState<Vozilo[]>([]);
  const [prikolice, setPrikolice] = React.useState<Prikolica[]>([]);
  const [vozaci, setVozaci] = React.useState<Vozac[]>([]);
  const [roba, setRoba] = React.useState<Roba[]>([]);
  const [partneri, setPartneri] = React.useState<Partner[]>([]);
  const [mjestaIsporuke, setMjestaIsporuke] = React.useState<MjestoIsporuke[]>(
    []
  );
  const [mirnaVaga, setMirnaVaga] = React.useState<boolean>(true);
  const [vrijednostVage, setVrijednostVage] = useState('');
  const { control, getValues, handleSubmit, errors, reset } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    storage.get(dbnames.vozila, (err, data: any) => {
      if (!err) {
        try {
          setVozila(data.map(Vozilo.fromJSON));
        } catch (e) {
          console.log(e);
        }
      }
    });
    storage.get(dbnames.prikolice, (err, data: any) => {
      if (!err) {
        try {
          setPrikolice(data.map(Prikolica.fromJSON));
        } catch (e) {
          console.log(e);
        }
      }
    });
    storage.get(dbnames.vozaci, (err, data: any) => {
      if (!err) {
        try {
          setVozaci(data.map(Vozac.fromJSON));
        } catch (e) {
          console.log(e);
        }
      }
    });
    storage.get(dbnames.roba, (err, data: any) => {
      if (!err) {
        try {
          setRoba(data.map(Roba.fromJSON));
        } catch (e) {
          console.log(e);
        }
      }
    });
    storage.get(dbnames.partneri, (err, data: any) => {
      if (!err) {
        try {
          setPartneri(data.map(Partner.fromJSON));
        } catch (e) {
          console.log(e);
        }
      }
    });
    storage.get(dbnames.mjesta, (err, data: any) => {
      if (!err) {
        try {
          setMjestaIsporuke(data.map(MjestoIsporuke.fromJSON));
        } catch (e) {
          console.log(e);
        }
      }
    });
  }, []);

  return (
    <>
      <UnosVaganjaScreen
        reset={reset}
        errors={errors}
        showSpremljenoVaganje={() => setShowSpremljenoVaganje(true)}
        handleSubmit={handleSubmit}
        getValues={getValues}
        mirnaVaga={mirnaVaga}
        vrijednostVage={vrijednostVage}
        control={control}
        vozila={vozila}
        prikolice={prikolice}
        vozaci={vozaci}
        roba={roba}
        partneri={partneri}
        mjestaIsporuke={mjestaIsporuke}
      />
      <VaganjeSpremljenoModalUnos
        show={showSpremljenoVaganje}
        hide={() => props.history.push(RoutesEnum.Home)}
        pathUkupni={`${app.getPath('appData')}/UkupniIzvjestaj.pdf`}
        pathDrugo={`${app.getPath('appData')}/DrugoVaganje.pdf`}
        pathPrvo={`${app.getPath('appData')}/PrvoVaganje.pdf`}
      />
    </>
  );
}

export default withRouter<any, any>(UnosVaganjaContainer);
