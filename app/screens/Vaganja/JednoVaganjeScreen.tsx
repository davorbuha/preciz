/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Control, Controller } from 'react-hook-form';
import colors from '../../styles/colors';
import Dropdown from '../../components/Dropdown';
import Vozilo from '../../types/Vozilo';
import DisabledOutlined from '../../components/DisabledOutlined';
import Prikolica from '../../types/Prikolica';
import Vozac from '../../types/Vozac';
import Roba from '../../types/Roba';
import FreeDropdown from '../../components/FreeDropdown';
import Partner from '../../types/Partner';
import MjestoIsporuke from '../../types/MjestoIsporuke';
import OutlinedTextField from '../../components/OutlinedTextField';
import IzvaganaMasaComponent from '../../components/IzvaganaMasaComponent';

const tipoviVaganja = [
  { title: 'Ulaz', value: 'ulaz' },
  { title: 'Izlaz', value: 'izlaz' }
];

const fields = {
  tipoviVaganja: 'tipoviVaganja',
  vozilo: 'vozilo',
  prikolica: 'prikolica',
  vozac: 'vozac',
  roba: 'roba',
  dobavljac: 'dobavljac',
  mjestoIsporuke: 'mjestoIsporuke',
  brojNaloga: 'brojNaloga'
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '85vh',
    padding: '20px 50px',
    overflowY: 'scroll'
  },
  weigthingDataTitle: {
    marginBottom: 10,
    color: colors.primary
  },
  formcontrol: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 50
  },
  span: {
    minWidth: 160,
    fontSize: 20
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputRow: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

interface Props {
  vozila: Vozilo[];
  prikolice: Prikolica[];
  vozaci: Vozac[];
  roba: Roba[];
  partneri: Partner[];
  mjestaIsporuke: MjestoIsporuke[];
  control: Control<Record<string, any>>;
  watch: any;
  vrijednostVage: string;
  mirnaVaga: boolean;
}

function JednoVaganjeScreen(props: Props) {
  const classes = useStyles();
  const { control } = props;
  const voziloMasaRef = React.useRef();
  const prikolicaMasaRef = React.useRef();
  const sifraRobeRef = React.useRef();
  const onVoziloChange = React.useCallback(
    ev => {
      (voziloMasaRef.current as any).setTitle(
        props.vozila.find(item => item.id === ev[0])!.tezina
      );
      return ev[0];
    },
    [props.vozila]
  );
  const onPrikolicaChange = React.useCallback(
    ev => {
      (prikolicaMasaRef.current as any).setTitle(
        props.prikolice.find(item => item.id === ev[0])!.tezinaPrikolice
      );
      return ev[0];
    },
    [props.prikolice]
  );
  const onRobaChange = React.useCallback(
    ev => {
      if (!ev[0]) {
        (sifraRobeRef.current as any).setTitle('');
        return '';
      }
      const found = props.roba.find(
        item => item.naziv.toLowerCase() === ev[0].toLowerCase()
      )!;
      if (found) {
        (sifraRobeRef.current as any).setTitle(found.sifraRobe);
      } else {
        (sifraRobeRef.current as any).setTitle('');
      }
      return ev[0];
    },
    [props.roba]
  );
  return (
    <div className={classes.container}>
      <div className={classes.titleRow}>
        <h2>Jedno vaganje</h2>
        <Controller
          defaultValue=""
          control={control}
          name={fields.tipoviVaganja}
          as={<Dropdown data={tipoviVaganja} />}
        />
      </div>
      <h3 className={classes.weigthingDataTitle}>PODACI O VAGANJU</h3>
      <div className={classes.inputRow}>
        <span className={classes.span}>Vozilo: </span>
        <Controller
          onChange={onVoziloChange}
          defaultValue=""
          control={control}
          name={fields.vozilo}
          as={
            <Dropdown
              width={250}
              marginLeft={60}
              data={props.vozila.map(item => ({
                title: item.registracija,
                value: item.id
              }))}
            />
          }
        />
        <span style={{ marginLeft: 80 }} className={classes.span}>
          Masa:
        </span>
        <DisabledOutlined ref={voziloMasaRef} marginLeft={80} />
      </div>
      <div className={classes.inputRow}>
        <span className={classes.span}>Prikolica: </span>
        <Controller
          onChange={onPrikolicaChange}
          defaultValue=""
          control={control}
          name={fields.prikolica}
          as={
            <Dropdown
              width={250}
              marginLeft={60}
              data={props.prikolice.map(item => ({
                title: item.registracijaPrikolice,
                value: item.id
              }))}
            />
          }
        />
        <span style={{ marginLeft: 80 }} className={classes.span}>
          Masa:
        </span>
        <DisabledOutlined ref={prikolicaMasaRef} marginLeft={80} />
      </div>
      <div className={classes.inputRow}>
        <span className={classes.span}>Vozač: </span>
        <Controller
          defaultValue=""
          control={control}
          name={fields.vozac}
          as={
            <Dropdown
              width={350}
              marginLeft={60}
              data={props.vozaci.map(item => ({
                title: item.ime + ' ' + item.prezime,
                value: item.id
              }))}
            />
          }
        />
      </div>
      <div className={classes.inputRow}>
        <span className={classes.span}>Roba: </span>
        <Controller
          onChange={onRobaChange}
          defaultValue=""
          control={control}
          name={fields.roba}
          as={
            <FreeDropdown
              width={250}
              marginLeft={60}
              data={props.roba.map(item => ({
                title: item.naziv,
                value: item.id
              }))}
            />
          }
        />
        <span style={{ marginLeft: 80 }} className={classes.span}>
          Šifra:
        </span>
        <DisabledOutlined suffix={' '} ref={sifraRobeRef} marginLeft={80} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <div className={classes.inputRow}>
            <span className={classes.span}>Dobavljač: </span>
            <Controller
              defaultValue=""
              control={control}
              name={fields.dobavljac}
              as={
                <FreeDropdown
                  width={250}
                  marginLeft={60}
                  data={props.partneri.map(item => ({
                    title: item.naziv,
                    value: item.id
                  }))}
                />
              }
            />
          </div>
          <div className={classes.inputRow}>
            <span className={classes.span}>Mjesto Isporuke: </span>
            <Controller
              defaultValue=""
              control={control}
              name={fields.mjestoIsporuke}
              as={
                <FreeDropdown
                  width={250}
                  marginLeft={60}
                  data={props.mjestaIsporuke.map(item => ({
                    title: item.naziv,
                    value: item.id
                  }))}
                />
              }
            />
          </div>
          <div className={classes.inputRow}>
            <span className={classes.span}>Broj naloga: </span>
            <Controller
              defaultValue=""
              control={control}
              name={fields.brojNaloga}
              as={<OutlinedTextField width={250} marginLeft={60} />}
            />
          </div>
        </div>
        <IzvaganaMasaComponent
          mirnaVaga={props.mirnaVaga}
          vrijednostVage={props.vrijednostVage}
        />
      </div>
    </div>
  );
}

export default JednoVaganjeScreen;
