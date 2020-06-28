/* eslint-disable radix */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import ReactPDF, { Font } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import storage from 'electron-json-storage';
import font from '../../assets/fonts/Poppins-Medium.ttf';
import bold from '../../assets/fonts/Poppins-Bold.ttf';
import Vozilo from '../../types/Vozilo';
import Prikolica from '../../types/Prikolica';
import Vozac from '../../types/Vozac';
import Roba from '../../types/Roba';
import Partner from '../../types/Partner';
import MjestoIsporuke from '../../types/MjestoIsporuke';
import MainContext from '../../context/MainContext';
import OutlinedTextField from '../../components/OutlinedTextField';
import colors from '../../styles/colors';
import Dropdown from '../../components/Dropdown';
import DisabledOutlined from '../../components/DisabledOutlined';
import FreeDropdown from '../../components/FreeDropdown';
import UnosVaganjaComponent from '../../components/UnosVaganjaComponent';
import {
  getRegistracijaById,
  getPrikolicaRegistracijaById,
  getVozacById
} from '../../components/helpers';
import { Detalji } from '../../components/JednoVaganjePDF';
import PrvoVaganje from '../../types/PrvoVaganje';
import PrvoVaganjePDF from '../../components/PrvoVaganjePDF';
import dbnames from '../../db/dbnames';
import DrugoVaganje from '../../types/DrugoVaganje';
import DrugoVaganjePDF from '../../components/DrugoVaganjePDF';
import UkupniIzvjestajPDF from '../../components/UkupniIzvjestajPDF';

const tipoviVaganja = [
  { title: 'Ulaz', value: 'Ulaz' },
  { title: 'Izlaz', value: 'Izlaz' }
];

export const fields = {
  tipoviVaganja: 'tipoviVaganja',
  vozilo: 'vozilo',
  prikolica: 'prikolica',
  vozac: 'vozac',
  roba: 'roba',
  dobavljac: 'dobavljac',
  mjestoIsporuke: 'mjestoIsporuke',
  brojNaloga: 'brojNaloga',
  vaganje1: 'vaganje1',
  vaganje2: 'vaganje2'
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

function UnosVaganjaScreen(props: Props) {
  const { state } = React.useContext(MainContext);
  const classes = useStyles();
  const { control } = props;
  const voziloMasaRef = React.useRef();
  const prikolicaMasaRef = React.useRef();
  const sifraRobeRef = React.useRef();
  const [tezinaVozila, setTezinaVozila] = React.useState('');
  const [tezinaPrikolice, setTezinaPrikolice] = React.useState('');
  const handleSpremiPress = (prvoDate: Date, drugoDate: Date) => {
    props.handleSubmit(async values => {
      const idDrugog = uuidv4();
      // Font.register({ family: 'Poppins', src: font });
      // Font.register({ family: 'Poppins-Bold', src: bold });
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
      const bruto =
        tip === 'Ulaz'
          ? parseInt(values[fields.vaganje1])
          : parseInt(values[fields.vaganje2]);
      const neto =
        tip === 'Ulaz'
          ? parseInt(values[fields.vaganje1]) -
            parseInt(values[fields.vaganje2])
          : parseInt(values[fields.vaganje2]) -
            parseInt(values[fields.vaganje2]);
      const tara = bruto - neto;
      const drugoVaganje = new DrugoVaganje(
        idDrugog,
        bruto,
        neto,
        tara,
        moment(drugoDate)
      );
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
        parseInt(values[fields.vaganje1]),
        moment(prvoDate),
        idDrugog
      );
      ReactPDF.render(
        <PrvoVaganjePDF
          ts={moment(prvoDate)}
          bruto={parseInt(values[fields.vaganje1])}
          detalji={detalji}
          company={state.company}
        />,
        `${__dirname}/PrvoVaganje.pdf`,
        () => {
          ReactPDF.render(
            <DrugoVaganjePDF
              ts={moment(drugoDate)}
              bruto={bruto}
              neto={neto}
              tara={tara}
              detalji={detalji}
              company={state.company}
            />,
            `${__dirname}/DrugoVaganje.pdf`,
            () => {
              ReactPDF.render(
                <UkupniIzvjestajPDF
                  ts1={moment(prvoDate)}
                  ts2={moment(drugoDate)}
                  vrijednostPrvo={parseInt(values[fields.vaganje1])}
                  vrijednostDrugog={parseInt(values[fields.vaganje2])}
                  bruto={bruto}
                  neto={neto}
                  tara={tara}
                  detalji={detalji}
                  company={state.company}
                />,
                `${__dirname}/UkupniIzvjestaj.pdf`,
                () => {}
              );
            }
          );
        }
      );
      storage.get(dbnames.drugoVaganje, (err1, data) => {
        let prev: any = [];
        if (Array.isArray(data)) {
          prev = data.map(DrugoVaganje.fromJSON);
        }
        storage.set(dbnames.drugoVaganje, [drugoVaganje, ...prev], err => {});
      });
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
  const onVoziloChange = React.useCallback(
    ev => {
      (voziloMasaRef.current as any).setTitle(
        props.vozila.find(item => item.id === ev[0])!.tezina
      );
      setTezinaVozila(props.vozila.find(item => item.id === ev[0])!.tezina);
      return ev[0];
    },
    [props.vozila]
  );
  const onPrikolicaChange = React.useCallback(
    ev => {
      (prikolicaMasaRef.current as any).setTitle(
        props.prikolice.find(item => item.id === ev[0])!.tezinaPrikolice
      );
      setTezinaPrikolice(
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
        <h2>Unos vaganja</h2>
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
            onChange={onVoziloChange}
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
        <UnosVaganjaComponent
          control={control}
          handleSpremiPress={handleSpremiPress}
        />
      </div>
    </div>
  );
}

export default UnosVaganjaScreen;
