import React from 'react';
import { useForm } from 'react-hook-form';
import storage from 'electron-json-storage';
import ParametriVageScreen, {
  fields
} from '../../screens/Podesenja/ParametriVageScreen';
import dbnames from '../../db/dbnames';
import Postavke from '../../types/Postavke';
import MainContext from '../../context/MainContext';

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

let portState: any;

function ParametriVageContainer() {
  const { setSettings, state } = React.useContext(MainContext);
  const { setValue, control, errors, handleSubmit, getValues } = useForm({
    mode: 'onChange'
  });
  const [stringVage, setStringVage] = React.useState('');
  React.useEffect(() => {
    return () => {
      if (portState) portState.close();
    };
  }, []);
  React.useEffect(() => {
    if (portState) (portState as any).close();
    if (state.settings.communicationPort) {
      const port = new SerialPort(state.settings.communicationPort, {
        baudRate: state.settings.baudRate
      });
      const parser = new Readline();
      port.pipe(parser);
      portState = port;
      setStringVage('');
      parser.on('data', line => setStringVage(line));
      port.on('close', function() {
        console.log('closed');
      });
    }
  }, [state]);
  React.useEffect(() => {
    if (!state.settings.communicationPort) {
      storage.get(dbnames.postavke, (err, data) => {
        const postavke = Postavke.fromJSON(data);
        setValue(fields.communicationPort, postavke.communicationPort);
        setValue(fields.baudRate, postavke.baudRate);
        setValue(fields.startPosition, postavke.startPostion);
        setValue(fields.endPosition, postavke.endPosition);
      });
    } else {
      setValue(fields.communicationPort, state.settings.communicationPort);
      setValue(fields.baudRate, state.settings.baudRate);
      setValue(fields.startPosition, state.settings.startPostion);
      setValue(fields.endPosition, state.settings.endPosition);
    }
  }, []);

  const submit = () => {
    handleSubmit(values => {
      const postavke = new Postavke(
        values[fields.communicationPort],
        values[fields.baudRate],
        values[fields.startPosition],
        values[fields.endPosition]
      );
      setSettings(postavke);
      storage.set(dbnames.postavke, postavke.toJSON(), () => {});
    })();
  };
  return (
    <ParametriVageScreen
      stringVage={stringVage}
      setValue={setValue}
      getValues={getValues}
      handleSubmit={submit}
      errors={errors}
      control={control}
    />
  );
}

export default ParametriVageContainer;
