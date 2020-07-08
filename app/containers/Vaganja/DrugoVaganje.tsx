/* eslint-disable import/no-cycle */
import React from 'react';
import storage from 'electron-json-storage';
import DrugoVaganjeScreen from '../../screens/Vaganja/DrugoVaganjeScreen';
import dbnames from '../../db/dbnames';
import PrvoVaganje from '../../types/PrvoVaganje';
import MainContext from '../../context/MainContext';
import { delimiterStr } from '../Podesenja/ParametriVage';

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const stanja = Array(20).fill('');

function DrugoVaganjeContainer() {
  const [vrijednostVage, setVrijednostVage] = React.useState('');
  const { state } = React.useContext(MainContext);
  const [prvaVaganja, setPrvaVaganja] = React.useState<PrvoVaganje[]>([]);
  const [mirnaVaga, setMirnaVaga] = React.useState<boolean>(true);
  React.useEffect(() => {
    storage.get(dbnames.prvoVaganje, (err, data) => {
      if (Array.isArray(data)) {
        setPrvaVaganja(data.map(PrvoVaganje.fromJSON));
      }
    });
  }, []);

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

  React.useEffect(() => {
    let port;
    if (state.settings.communicationPort) {
      setTimeout(() => {
        port = new SerialPort(state.settings.communicationPort, {
          baudRate: state.settings.baudRate
        });
        const parser = new Readline(
          state.settings.delimiter ? { delimiter: delimiterStr } : {}
        );
        port.pipe(parser);
        parser.on('data', handleVagaChange);
        port.on('close', function() {
          console.log('closed');
        });
      }, 1000);
    }
    return () => {
      if (port) port.close();
    };
  }, [state.settings]);

  return (
    <DrugoVaganjeScreen
      mirnaVaga={mirnaVaga}
      vrijednostVage={vrijednostVage}
      prvaVaganja={prvaVaganja}
    />
  );
}

export default DrugoVaganjeContainer;
