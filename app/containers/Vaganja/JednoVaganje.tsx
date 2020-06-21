import React, { useEffect, useState } from 'react';
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
import MainContext from '../../context/MainContext';

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const stanja = Array(20).fill('');

function JednoVaganjeContainer() {
  const { state } = React.useContext(MainContext);
  const [vozila, setVozila] = React.useState<Vozilo[]>([]);
  const [prikolice, setPrikolice] = React.useState<Prikolica[]>([]);
  const [vozaci, setVozaci] = React.useState<Vozac[]>([]);
  const [roba, setRoba] = React.useState<Roba[]>([]);
  const [partneri, setPartneri] = React.useState<Partner[]>([]);
  const [mjestaIsporuke, setMjestaIsporuke] = React.useState<MjestoIsporuke[]>(
    []
  );
  const [mirnaVaga, setMirnaVaga] = React.useState<boolean>(false);
  const [vrijednostVage, setVrijednostVage] = useState('');
  const { watch, control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleVagaChange = (data: string) => {
    const value = data
      .split('')
      .filter(
        (char, i) =>
          i >= state.settings.startPostion && i <= state.settings.endPosition
      )
      .join('');
    if (stanja[0]) {
      setVrijednostVage(value);
    } else {
      setMirnaVaga(true);
    }
    stanja.pop();
    stanja.unshift(value);
    const allEqual = stanja.every(v => v === stanja[0]);
    if (allEqual) {
      setMirnaVaga(true);
    } else {
      setMirnaVaga(false);
    }
  };
  useEffect(() => {
    if (state.settings.communicationPort) {
      const port = new SerialPort(state.settings.communicationPort, {
        baudRate: state.settings.baudRate
      });
      const parser = new Readline();
      port.pipe(parser);
      parser.on('data', handleVagaChange);
      port.on('close', function() {
        console.log('closed');
      });
    }
  }, [state.settings]);
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
      mirnaVaga={mirnaVaga}
      vrijednostVage={vrijednostVage}
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
