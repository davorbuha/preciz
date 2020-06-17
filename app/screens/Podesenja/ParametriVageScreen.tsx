import React from 'react';
import {
  Control,
  NestDataObject,
  FieldError,
  OnSubmit,
  Controller
} from 'react-hook-form';
import Dropdown, { Element } from '../../components/Dropdown';

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

interface Props {
  getValues: (a: string) => any;
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  handleSubmit: (
    callback: OnSubmit<Record<string, any>>
  ) => (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

const fields = {
  communicationPort: 'communicationPort',
  baudRates: 'baudRates'
};

const communicationPorts: Element[] = [
  { title: 'COM1', value: 'COM1' },
  { title: 'COM2', value: 'COM2' },
  { title: 'COM3', value: 'COM3' },
  { title: 'COM4', value: 'COM4' },
  { title: 'COM5', value: 'COM5' },
  { title: 'COM6', value: 'COM6' },
  { title: 'COM7', value: 'COM7' },
  { title: 'COM8', value: 'COM8' }
];

const baudRates: Element[] = [
  { title: '2400', value: 2400 },
  { title: '4800', value: 4800 },
  { title: '9600', value: 9600 },
  { title: '14400', value: 14400 },
  { title: '28800', value: 28800 }
];

function ParametriVageScreen(p: Props) {
  const { control } = p;
  React.useEffect(() => {
    const port = new SerialPort('/dev/tty.usbserial-14320', { baudRate: 9600 });

    const parser = new Readline();
    port.pipe(parser);

    parser.on('data', line => console.log(`> ${line}`));
  }, []);
  return (
    <div style={{ padding: '20px 50px' }}>
      <h1 style={{ marginBottom: 20 }}>Podešavanje vage: </h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 20 }}>Communication port: </span>
        <Controller
          name={fields.communicationPort}
          control={control}
          as={
            <Dropdown data={communicationPorts} width={250} marginLeft={60} />
          }
        />
      </div>
      <div style={{ marginTop: 40, display: 'flex', alignItems: 'center' }}>
        <span style={{ minWidth: '185px', fontSize: 20 }}>
          Bits per second:
        </span>
        <Controller
          name={fields.baudRates}
          control={control}
          as={<Dropdown data={baudRates} width={250} marginLeft={60} />}
        />
      </div>
    </div>
  );
}

export default ParametriVageScreen;
