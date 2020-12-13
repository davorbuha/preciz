/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Radio,
  Button,
  Dialog
} from '@material-ui/core';
import moment from 'moment';
import storage from 'electron-json-storage';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';
import { History } from 'history';
import ReactPDF, { Font } from '@react-pdf/renderer';
import font from '../../assets/fonts/Poppins-Regular.ttf';
import fontBold from '../../assets/fonts/Poppins-Bold.ttf';
import PrvoVaganje from '../../types/PrvoVaganje';
import colors from '../../styles/colors';
import OutlinedTextField from '../../components/OutlinedTextField';
import DrugoVaganjeIzvaganaMasaComponent from '../../components/DrugoVaganjeIzvaganaMasaComponent';
import DrugoVaganje from '../../types/DrugoVaganje';
import dbnames from '../../db/dbnames';
import VaganjeSpremljenoModal from '../../components/VaganjeSpremljenoModal';
import { RoutesEnum } from '../../routes';
import MainContext from '../../context/MainContext';
import { Detalji } from '../../components/PrvoVaganjePDF';
import DrugoVaganjePDF from '../../components/DrugoVaganjePDF';
import UkupniIzvjestajPDF from '../../components/UkupniIzvjestajPDF';
import VaganjeSpremljenoModalUkupno from '../../components/VaganjeSpremljenoModalUkupno';
import CameraPreview from '../../components/CameraPreview';

const app = require('electron').remote.app;

interface Props {
  mirnaVaga: boolean;
  vrijednostVage: string;
  prvaVaganja: PrvoVaganje[];
  history: History;
}

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
  tr: {
    background: colors.grey,
    '&:hover': {
      cursor: 'pointer',
      background: colors.darkGrey
    }
  },
  tableContainer: {
    maxHeight: '300px',
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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputRow: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
}));

function DrugoVaganjeScreen(props: Props) {
  const { state } = React.useContext(MainContext);
  const [isDialogOpened, setIsDialogOpened] = React.useState(false)
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const vrijednostVageInt = React.useMemo(
    () => parseInt(props.vrijednostVage),
    [props.vrijednostVage]
  );
  const classes = useStyles();
  const [selected, setSelected] = React.useState<PrvoVaganje>();
  const handleRowPress = (item: PrvoVaganje) => () => {
    setSelected(item);
  };
  const filteredPrvaVaganje = React.useMemo(
    () => props.prvaVaganja.filter(item => item.drugoVaganjeId === undefined),
    [props.prvaVaganja, selected]
  );
  const bruto = selected
    ? selected?.tip === 'Ulaz'
      ? selected.bruto
      : vrijednostVageInt
    : 0;
  const tara = selected
    ? selected.tip === 'Ulaz'
      ? vrijednostVageInt
      : selected.bruto
    : 0;
  const neto = selected ? bruto - tara : 0;
  const handleSpremiPress = () => {
    const ts = moment();
    const id = uuidv4();
    const drugoVaganje = new DrugoVaganje(id, bruto, neto, tara, ts);
    storage.set(
      dbnames.prvoVaganje,
      props.prvaVaganja.map(item => {
        if (item.id === selected?.id) {
          item.drugoVaganjeId = id;
        }
        return item;
      }),
      err => console.log(err)
    );

    storage.get(dbnames.drugoVaganje, (err1, data) => {
      let prev: any = [];
      if (Array.isArray(data)) {
        prev = data.map(DrugoVaganje.fromJSON);
      }
      storage.set(dbnames.drugoVaganje, [drugoVaganje, ...prev], err => {});
    });

    const detalji: Detalji = {
      tip: selected!.tip,
      registracija: selected!.registracija,
      prikolica: selected!.prikolica,
      vozac: selected!.vozac,
      dobavljac: selected!.dobavljac,
      roba: selected!.roba,
      mjestoIsporuke: selected!.mjestoIsporuke,
      brojNalog: selected!.brojNaloga
    };
    ReactPDF.render(
      <DrugoVaganjePDF
        brojVaganja={selected?.brojVaganja}
        ts={ts}
        bruto={bruto}
        neto={neto}
        tara={tara}
        detalji={detalji}
        company={state.company}
      />,
      `${app.getPath('appData')}/DrugoVaganje.pdf`,
      () => {
        ReactPDF.render(
          <UkupniIzvjestajPDF
            brojVaganja={selected?.brojVaganja}
            ts1={selected!.ts}
            ts2={ts}
            vrijednostPrvo={selected!.bruto}
            vrijednostDrugog={vrijednostVageInt}
            bruto={bruto}
            neto={neto}
            tara={tara}
            detalji={detalji}
            company={state.company}
          />,
          `${app.getPath('appData')}/UkupniIzvjestaj.pdf`,
          () => {}
        );
      }
    );

    setSelected(undefined);
    setShowSuccessModal(true);
  };
  return (
    <div className={classes.container}>
      <CameraPreview isOpen={isDialogOpened} onClose={() => setIsDialogOpened(false)} onImageCapture={() => setIsDialogOpened(false)}/>
      <VaganjeSpremljenoModalUkupno
        show={showSuccessModal}
        hide={() => props.history.push(RoutesEnum.Home)}
        pathUkupni={`${app.getPath('appData')}/UkupniIzvjestaj.pdf`}
        path={`${app.getPath('appData')}/DrugoVaganje.pdf`}
      />
      <div className={classes.titleRow}>
        <h2>Vagarski list {selected?.brojVaganja}</h2>
        <Button
          onClick={() => setIsDialogOpened(true)}
          variant="contained"
          color="primary"
        >
          Uslikaj Tablicu
        </Button>
      </div>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell align="left">Broj vaganja</TableCell>
              <TableCell align="left">Registracija</TableCell>
              <TableCell align="left">Vozač</TableCell>
              <TableCell align="left">Dobavljač/Kupac</TableCell>
              <TableCell align="left">Roba</TableCell>
              <TableCell align="left">Mjesto isporuke</TableCell>
              <TableCell align="left">Broj naloga </TableCell>
              <TableCell align="left">Vrijeme</TableCell>
              <TableCell align="left">Masa (kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPrvaVaganje.map(item => (
              <TableRow
                onClick={handleRowPress(item)}
                className={classes.tr}
                style={{
                  backgroundColor:
                    item.id === selected?.id ? colors.primary : undefined
                }}
                key={item.id}
              >
                <TableCell align="left">
                  <Radio
                    color="primary"
                    checked={selected?.id === item.id}
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'D' }}
                  />
                </TableCell>
                <TableCell align="left">{item.brojVaganja}</TableCell>
                <TableCell align="left">{item.registracija}</TableCell>
                <TableCell align="left">{item.vozac}</TableCell>
                <TableCell align="left">{item.dobavljac}</TableCell>
                <TableCell align="left">{item.roba}</TableCell>
                <TableCell align="left">{item.mjestoIsporuke}</TableCell>
                <TableCell align="left">{item.brojNaloga}</TableCell>
                <TableCell align="left">
                  {item.ts.format('DD.MM.YYYY HH:mm')}
                </TableCell>
                <TableCell align="left">{item.bruto}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ minWidth: '70%' }}>
          <div className={classes.inputRow}>
            <span className={classes.span}>Broj vaganja: </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected?.brojVaganja}
            />
            <span className={classes.span} style={{ marginLeft: 20 }}>
              Registracija:{' '}
            </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.registracija : ''}
            />
          </div>
          <div className={classes.inputRow}>
            <span className={classes.span}>Vozač: </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.vozac : ''}
            />
            <span className={classes.span} style={{ marginLeft: 20 }}>
              Prikolica:{' '}
            </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.prikolica : ''}
            />
          </div>
          <div className={classes.inputRow}>
            <span className={classes.span}>Kupac/Dobavljač: </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.dobavljac : ''}
            />
            <span className={classes.span} style={{ marginLeft: 20 }}>
              Mjesto isporuke:{' '}
            </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.mjestoIsporuke : ''}
            />
          </div>
          <div className={classes.inputRow}>
            <span className={classes.span}>Roba: </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.roba : ''}
            />
            <span className={classes.span} style={{ marginLeft: 20 }}>
              Šifra robe:{' '}
            </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.sifraRobe : ''}
            />
          </div>
          <div className={classes.inputRow}>
            <span className={classes.span}>Broj naloga: </span>
            <OutlinedTextField
              marginLeft={40}
              maxWidth={140}
              minWidth={120}
              disabled
              value={selected ? selected.brojNaloga : ''}
            />
          </div>
        </div>
        <DrugoVaganjeIzvaganaMasaComponent
          handleSpremiPress={handleSpremiPress}
          brutto={bruto}
          tara={tara}
          neto={neto}
          mirnaVaga={props.mirnaVaga}
          vrijednostVage={vrijednostVageInt}
        />
      </div>
    </div>
  );
}

export default withRouter(DrugoVaganjeScreen);
