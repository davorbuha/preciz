/* eslint-disable import/no-cycle */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Control, Controller } from 'react-hook-form';
import ReactPDF, { Font } from '@react-pdf/renderer';
import moment from 'moment';
import storage from 'electron-json-storage';
import { v4 as uuidv4 } from 'uuid';
import font from '../../assets/fonts/Poppins-Medium.ttf';
import bold from '../../assets/fonts/Poppins-Bold.ttf';
import Vozilo from '../../types/Vozilo';
import Prikolica from '../../types/Prikolica';
import Vozac from '../../types/Vozac';
import Roba from '../../types/Roba';
import Partner from '../../types/Partner';
import MjestoIsporuke from '../../types/MjestoIsporuke';
import colors from '../../styles/colors';
import MainContext from '../../context/MainContext';
import Dropdown from '../../components/Dropdown';
import DisabledOutlined from '../../components/DisabledOutlined';
import FreeDropdown from '../../components/FreeDropdown';
import OutlinedTextField from '../../components/OutlinedTextField';
import PrvoVaganjeIzvaganaMasaComponent from '../../components/PrvoVaganjeIzvaganaMasaComponent';
import {
  getRegistracijaById,
  getPrikolicaRegistracijaById,
  getVozacById
} from '../../components/helpers';
import { Detalji } from '../../components/JednoVaganjePDF';
import dbnames from '../../db/dbnames';
import PrvoVaganjePDF from '../../components/PrvoVaganjePDF';
import PrvoVaganje from '../../types/PrvoVaganje';

const app = require('electron').remote.app;

const tipoviVaganja = [
  { title: 'Ulaz', value: 'Ulaz' },
  { title: 'Izlaz', value: 'Izlaz' }
];

interface Props {
  vozila: Vozilo[];
  prikolice: Prikolica[];
  vozaci: Vozac[];
  roba: Roba[];
  partneri: Partner[];
  mjestaIsporuke: MjestoIsporuke[];
  control: Control<Record<string, any>>;
  vrijednostVage: string;
  mirnaVaga: boolean;
  getValues: (key: string) => string;
  handleSubmit: (cb: any) => any;
  showSpremljenoVaganje: () => void;
  errors: any;
  reset: (a: any, b: any) => void;
}

export const fields = {
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
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
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

function PrvoVaganjeScreen(props: Props) {
  const { state } = React.useContext(MainContext);
  const classes = useStyles();
  const { control } = props;
  const sifraRobeRef = React.useRef();
  const brutto = isNaN(parseInt(props.vrijednostVage))
    ? 0
    : parseInt(props.vrijednostVage);
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

  const handleSpremiPress = () => {
    props.handleSubmit(async values => {
      const voziloId = values[fields.vozilo];
      const { registracija } = await getRegistracijaById(voziloId);
      const prikolicaId = values[fields.prikolica];
      const prikolica = prikolicaId
        ? (await getPrikolicaRegistracijaById(prikolicaId))
            .registracijaPrikolice
        : '';
      const vozacId = values[fields.vozac];
      const vozac = await getVozacById(vozacId);
      const tip = values[fields.tipoviVaganja];
      const imeVozaca = vozac.ime + ' ' + vozac.prezime;
      const roba = values[fields.roba];
      const dobavljac = values[fields.dobavljac];
      const mjestoIsporuke = values[fields.mjestoIsporuke];
      const brojNaloga = values[fields.brojNaloga];
      const detalji: Detalji = {
        tip,
        registracija,
        prikolica,
        vozac: imeVozaca,
        roba,
        dobavljac,
        mjestoIsporuke,
        brojNalog: brojNaloga
      };
      const ts = moment();
      // Font.register({ family: 'Poppins', src: font });
      // Font.register({ family: 'Poppins-Bold', src: bold });
      const vaganje = new PrvoVaganje(
        uuidv4(),
        tip,
        registracija,
        prikolica,
        imeVozaca,
        dobavljac,
        roba,
        (sifraRobeRef.current as any).title,
        mjestoIsporuke,
        brojNaloga,
        brutto,
        ts
      );
      ReactPDF.render(
        <PrvoVaganjePDF
          ts={ts}
          bruto={brutto}
          detalji={detalji}
          company={state.company}
        />,
        `${app.getPath('appData')}/PrvoVaganje.pdf`,
        () => {}
      );
      storage.get(dbnames.prvoVaganje, (err1, data) => {
        let prev: any = [];
        if (Array.isArray(data)) {
          prev = data.map(PrvoVaganje.fromJSON);
        }
        storage.set(dbnames.prvoVaganje, [vaganje, ...prev], err => {
          (sifraRobeRef.current as any).setTitle('');
          props.reset(
            {
              [fields.brojNaloga]: '',
              [fields.dobavljac]: '',
              [fields.mjestoIsporuke]: '',
              [fields.prikolica]: '',
              [fields.roba]: undefined,
              [fields.tipoviVaganja]: '',
              [fields.vozac]: '',
              [fields.vozilo]: ''
            },
            {
              errors: true, // errors will not be reset
              dirtyFields: true, // dirtyFields will not be reset
              dirty: true, // dirty will not be reset
              isSubmitted: false,
              touched: false,
              isValid: false,
              submitCount: false
            }
          );
          props.showSpremljenoVaganje();
        });
      });
    })();
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleRow}>
        <h2>Prvo vaganje</h2>
        <div className={classes.column}>
          <Controller
            rules={{ required: { value: true, message: 'Obavezan unos' } }}
            defaultValue=""
            control={control}
            name={fields.tipoviVaganja}
            as={
              <Dropdown
                error={props.errors[fields.tipoviVaganja]}
                data={tipoviVaganja}
              />
            }
          />
        </div>
      </div>
      <h3 className={classes.weigthingDataTitle}>PODACI O VAGANJU</h3>
      <div className={classes.inputRow}>
        <span className={classes.span}>Vozilo: </span>
        <div className={classes.column}>
          <Controller
            rules={{ required: { value: true, message: 'Obavezan unos' } }}
            defaultValue=""
            control={control}
            name={fields.vozilo}
            as={
              <Dropdown
                error={props.errors[fields.vozilo]}
                width={250}
                marginLeft={60}
                data={props.vozila.map(item => ({
                  title: item.registracija,
                  value: item.id
                }))}
              />
            }
          />
        </div>
      </div>
      <div className={classes.inputRow}>
        <span className={classes.span}>Prikolica: </span>
        <Controller
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
      </div>
      <div className={classes.inputRow}>
        <span className={classes.span}>Vozač: </span>
        <div className={classes.column}>
          <Controller
            rules={{ required: { value: true, message: 'Obavezan unos' } }}
            defaultValue=""
            control={control}
            name={fields.vozac}
            as={
              <Dropdown
                error={props.errors[fields.vozac]}
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
      </div>
      <div className={classes.inputRow}>
        <span className={classes.span}>Roba: </span>
        <div className={classes.column}>
          <Controller
            rules={{ required: { value: true, message: 'Obavezan unos' } }}
            onChange={onRobaChange}
            defaultValue=""
            control={control}
            name={fields.roba}
            as={
              <FreeDropdown
                error={props.errors[fields.roba]}
                width={250}
                marginLeft={60}
                data={props.roba.map(item => ({
                  title: item.naziv,
                  value: item.id
                }))}
              />
            }
          />
        </div>
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
            <div className={classes.column}>
              <Controller
                rules={{ required: { value: true, message: 'Obavezan unos' } }}
                defaultValue=""
                control={control}
                name={fields.brojNaloga}
                as={
                  <OutlinedTextField
                    error={props.errors[fields.brojNaloga]}
                    width={250}
                    marginLeft={60}
                  />
                }
              />
            </div>
          </div>
        </div>
        <PrvoVaganjeIzvaganaMasaComponent
          handleSpremiPress={handleSpremiPress}
          getValues={props.getValues}
          brutto={brutto}
          mirnaVaga={props.mirnaVaga}
          vrijednostVage={props.vrijednostVage}
        />
      </div>
    </div>
  );
}

export default PrvoVaganjeScreen;
