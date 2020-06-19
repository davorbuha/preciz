import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import storage from 'electron-json-storage';
import JednoVaganjeScreen from '../../screens/Vaganja/JednoVaganjeScreen';
import dbnames from '../../db/dbnames';
import Vozilo from '../../types/Vozilo';
import Prikolica from '../../types/Prikolica';
import Vozac from '../../types/Vozac';
import Roba from '../../types/Roba';
import Partner from '../../types/Partner';
import MjestoIsporuke from '../../types/MjestoIsporuke';

function JednoVaganjeContainer() {
  const [vozila, setVozila] = React.useState<Vozilo[]>([]);
  const [prikolice, setPrikolice] = React.useState<Prikolica[]>([]);
  const [vozaci, setVozaci] = React.useState<Vozac[]>([]);
  const [roba, setRoba] = React.useState<Roba[]>([]);
  const [partneri, setPartneri] = React.useState<Partner[]>([]);
  const [mjestaIsporuke, setMjestaIsporuke] = React.useState<MjestoIsporuke[]>(
    []
  );
  const { watch, control, handleSubmit } = useForm({ mode: 'onChange' });
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
    <JednoVaganjeScreen
      watch={watch}
      control={control}
      handleSubmit={() => {}}
      vozila={vozila}
      prikolice={prikolice}
      vozaci={vozaci}
      roba={roba}
      partneri={partneri}
      mjestaIsporuke={mjestaIsporuke}
    />
  );
}

export default JednoVaganjeContainer;
