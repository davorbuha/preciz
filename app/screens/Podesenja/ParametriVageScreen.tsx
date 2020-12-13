/* eslint-disable */
import React from 'react';
import {
  Control,
  NestDataObject,
  FieldError,
  Controller
} from 'react-hook-form';
import storage from 'electron-json-storage';
import { Button, Checkbox } from '@material-ui/core';
import Dropdown, { Element } from '../../components/Dropdown';
import StringVage from '../../components/StringVage';
import OutlinedTextField from '../../components/OutlinedTextField';
import MainContext from '../../context/MainContext';
import dbnames from '../../db/dbnames';

function renderErrorForField(errors: any, fieldName: string) {
  if (errors[fieldName]) {
    return (
      <p style={{ marginTop: 5, fontSize: 12, color: 'red' }}>
        {errors[fieldName].message}
      </p>
    );
  }
  return null;
}

interface Props {
  delimiter: boolean;
  setDelimiter: (v) => void;
  getValues: (a: string) => any;
  setValue: (k: string, v: any) => void;
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  handleSubmit: () => void;
  stringVage: string;
}

export const fields = {
  communicationPort: 'communicationPort',
  baudRate: 'baudRate',
  startPosition: 'startPosition',
  endPosition: 'endPosition',
  delimiter: 'delimiter',
  cameraIp: 'cameraIp',
  cameraUsername: 'cameraUsername',
  cameraPassword: 'cameraPassword',
  channelId: 'channelId'
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
  const { setShowSetupModal, setCompany } = React.useContext(MainContext);
  const { control, stringVage } = p;
  return (
    <div style={{ padding: '20px 50px' }}>
      <h1 style={{ marginBottom: 20 }}>Podešavanje vage: </h1>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>Communication port: </span>
            <Controller
              defaultValue=""
              name={fields.communicationPort}
              control={control}
              as={
                <Dropdown
                  data={communicationPorts}
                  width={250}
                  marginLeft={60}
                />
              }
            />
          </div>
        </>
        <div style={{ marginLeft: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 20, minWidth: '250px' }}>
              IP adresa kamere:
            </span>
            <Controller
              defaultValue=""
              name={fields.cameraIp}
              control={control}
              as={<OutlinedTextField width={250} marginLeft={0} />}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'row' }}>
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '185px', fontSize: 20 }}>
              Bits per second:
            </span>
            <Controller
              defaultValue=""
              name={fields.baudRate}
              control={control}
              as={<Dropdown data={baudRates} width={250} marginLeft={60} />}
            />
          </div>
        </>
        <div style={{ marginLeft: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 20, minWidth: '250px' }}>
              Korisničko ime kamere:
            </span>
            <Controller
              defaultValue=""
              name={fields.cameraUsername}
              control={control}
              as={<OutlinedTextField width={250} marginLeft={0} />}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ minWidth: '185px', fontSize: 20 }}>
            Početna pozicija:
          </span>
          <div style={{ marginLeft: 60 }}>
            <Controller
              defaultValue=""
              name={fields.startPosition}
              control={control}
              as={<OutlinedTextField width={250} marginLeft={0} />}
            />
            {renderErrorForField(p.errors, fields.startPosition)}
          </div>
        </div>
        <div style={{ marginLeft: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 20, minWidth: '250px' }}>
              Lozinka kamere:
            </span>
            <Controller
              defaultValue=""
              name={fields.cameraUsername}
              control={control}
              as={
                <OutlinedTextField type="password" width={250} marginLeft={0} />
              }
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span style={{ minWidth: '185px', fontSize: 20 }}>
            Krajnja pozicija:
          </span>
          <div style={{ marginLeft: 60 }}>
            <Controller
              // rules={{
              //   pattern: {
              //     value: /^\d+$/,
              //     message: 'Unesena vrijednost mora biti broj'
              //   }
              // }}
              defaultValue=""
              name={fields.endPosition}
              control={control}
              as={<OutlinedTextField width={250} marginLeft={0} />}
            />
            {renderErrorForField(p.errors, fields.endPosition)}
          </div>
        </div>
        <div style={{ marginLeft: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 20, minWidth: '250px' }}>
              Kanal kamere:
            </span>
            <Controller
              defaultValue=""
              name={fields.cameraUsername}
              control={control}
              as={<OutlinedTextField width={250} marginLeft={0} />}
            />
          </div>
        </div>
      </div>
      <StringVage stringVage={stringVage} />
      <div
        style={{
          marginTop: 40,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 40
        }}
      >
        <span style={{ minWidth: '185px', fontSize: 20 }}>Delimiter:</span>
        <div style={{ marginLeft: 60 }}>
          <Checkbox
            checked={p.delimiter ? true : false}
            onChange={a => p.setDelimiter(a.target.checked)}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
      </div>
      <div style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
        <Button
          color="secondary"
          style={{ marginBottom: 10 }}
          onClick={() => {
            setCompany({});
            storage.set(dbnames.setup, {}, () => {
              setShowSetupModal(true);
            });
          }}
          variant="contained"
        >
          Obrisi Podatke Firme
        </Button>
        <Button onClick={p.handleSubmit} variant="contained">
          Spremi
        </Button>
      </div>
    </div>
  );
}

export default ParametriVageScreen;
