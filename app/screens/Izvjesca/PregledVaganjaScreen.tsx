/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
import React from 'react';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import storage from 'electron-json-storage';
import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Button
} from '@material-ui/core';
import moment from 'moment';
import ptp from 'pdf-to-printer';
import ReactPDF from '@react-pdf/renderer';
import DateFnsUtils from '@date-io/date-fns';
import { PregledType } from '../../containers/Izvjesca/PregledVaganja';
import PregledTable from '../../components/PregledTable';
import colors from '../../styles/colors';
import Partner from '../../types/Partner';
import Roba from '../../types/Roba';
import Vozilo from '../../types/Vozilo';
import Dropdown, { Element } from '../../components/Dropdown';
import UkupniIzvjestajPDF, {
  Detalji
} from '../../components/UkupniIzvjestajPDF';
import MainContext from '../../context/MainContext';
import dbnames from '../../db/dbnames';
import JednoVaganje from '../../types/JednoVaganje';
import PrvoVaganje from '../../types/PrvoVaganje';

const { app } = require('electron').remote;

const style = {
  regularText: {
    fontSize: 16,
    padding: '0px 10px',
    margin: '10px 0px',
    width: '33%',
    display: 'flex'
  },
  dateRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '500px',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 4,
    borderStyle: 'solid'
  },
  dateRowWithoutBorder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '500px',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 0px',
    maxWidth: '100vw',
    overflow: 'hidden'
  }
};

interface Props {
  kupci: Partner[];
  roba: Roba[];
  vozila: Vozilo[];
  vaganja: PregledType[];
  removeJednoVaganje: (id: string) => void;
  removePrvoVaganje: (id: string) => void;
}

function PregledVaganjaScreen(props: Props) {
  const { state } = React.useContext(MainContext);
  const [selectedVaganje, setSelectedVaganje] = React.useState<
    PregledType | undefined
  >();
  const [selectedDatePrvo, setSelectedDatePrvo] = React.useState<Date | null>(
    null
  );
  const [selectedDateDrugo, setSelectedDateDrugo] = React.useState<Date | null>(
    null
  );
  const [selectedVozilo, setSelectedVozilo] = React.useState<
    Element | undefined
  >();
  const [selectedRoba, setSelectedRoba] = React.useState<Element | undefined>();
  const [selectedPartner, setSelectedPartner] = React.useState<
    Element | undefined
  >();
  const onVoziloChange = id => {
    const temp = props.vozila.find(item => item.id === id)!;
    setSelectedVozilo({ title: temp.registracija, value: temp.id });
  };
  const onRobaChange = id => {
    const temp = props.roba.find(item => item.id === id)!;
    setSelectedRoba({ title: temp.naziv, value: temp.id });
  };
  const onPartnerChange = id => {
    const temp = props.kupci.find(item => item.id === id)!;
    setSelectedPartner({ title: temp.naziv, value: temp.id });
  };

  const handleDateChangePrvo = (date: Date | null) => {
    setSelectedDatePrvo(date);
  };
  const handleDateChangeDrugo = (date: Date | null) => {
    setSelectedDateDrugo(date);
  };
  const filteredVaganja = React.useMemo(() => {
    let toReturn: PregledType[] = [...props.vaganja];
    if (selectedDatePrvo) {
      toReturn = [...toReturn].filter(vaganjeItem =>
        vaganjeItem.ts1.isAfter(moment(selectedDatePrvo))
      );
    }
    if (selectedDateDrugo) {
      toReturn = [...toReturn].filter(vaganjeItem =>
        vaganjeItem.ts1.isBefore(moment(selectedDateDrugo))
      );
    }
    if (selectedVozilo?.value !== '0') {
      toReturn = [...toReturn].filter(
        vaganjeItem => vaganjeItem.registracija === selectedVozilo?.title
      );
    }
    if (selectedRoba?.value !== '0') {
      toReturn = [...toReturn].filter(
        vaganjeItem => vaganjeItem.roba === selectedRoba?.title
      );
    }
    if (selectedPartner?.value !== '0') {
      toReturn = [...toReturn].filter(
        vaganjeItem => vaganjeItem.dobavljac === selectedPartner?.title
      );
    }
    return toReturn;
  }, [
    selectedVozilo,
    selectedDateDrugo,
    selectedDatePrvo,
    selectedPartner,
    selectedRoba,
    props.vaganja
  ]);

  const handleStorniraj = () => {
    storage.get(dbnames.jednoVaganje, (err, jednoData) => {
      if (Array.isArray(jednoData)) {
        const jednoVaganjeParsed = jednoData
          .map(JednoVaganje.fromJSON)
          .filter(jednoItem => jednoItem.id !== selectedVaganje!.id);
        props.removeJednoVaganje(selectedVaganje!.id);
        storage.set(dbnames.jednoVaganje, jednoVaganjeParsed, () => {});
      }
    });
    storage.get(dbnames.prvoVaganje, (err, prvoData) => {
      console.log(prvoData, selectedVaganje);
      if (Array.isArray(prvoData)) {
        const prvoVaganjeParsed = prvoData
          .map(PrvoVaganje.fromJSON)
          .filter(prvoItem => prvoItem.id !== selectedVaganje!.id);
        console.log(prvoVaganjeParsed);
        props.removePrvoVaganje(selectedVaganje!.id);
        storage.set(dbnames.prvoVaganje, prvoVaganjeParsed, () => {});
      }
    });
  };

  const handlePrint = () => {
    const detalji: Detalji = {
      brojNalog: selectedVaganje!.brojNaloga,
      dobavljac: selectedVaganje!.dobavljac,
      mjestoIsporuke: selectedVaganje!.mjestoIsporuke,
      prikolica: selectedVaganje!.prikolica,
      registracija: selectedVaganje!.registracija,
      roba: selectedVaganje!.roba,
      tip: selectedVaganje!.tip,
      vozac: selectedVaganje!.vozac
    };
    ReactPDF.render(
      <UkupniIzvjestajPDF
        ts1={selectedVaganje!.ts1}
        ts2={selectedVaganje!.ts2}
        vrijednostPrvo={
          selectedVaganje!.tip === 'Ulaz'
            ? selectedVaganje!.bruto
            : selectedVaganje!.tara
        }
        vrijednostDrugog={
          selectedVaganje!.tip === 'Ulaz'
            ? selectedVaganje!.tara
            : selectedVaganje!.bruto
        }
        bruto={selectedVaganje!.bruto}
        neto={selectedVaganje!.neto}
        tara={selectedVaganje!.tara}
        detalji={detalji}
        company={state.company}
      />,
      `${app.getPath('appData')}/UkupniIzvjestaj.pdf`,
      () => {
        ptp.print(`${app.getPath('appData')}/UkupniIzvjestaj.pdf`);
      }
    );
  };
  React.useEffect(() => {
    setSelectedPartner({
      title: props.kupci[0]?.naziv,
      value: props.kupci[0]?.id
    });
  }, [props.kupci]);
  React.useEffect(() => {
    setSelectedRoba({
      title: props.roba[0]?.naziv,
      value: props.roba[0]?.id
    });
  }, [props.roba]);
  React.useEffect(() => {
    setSelectedVozilo({
      title: props.vozila[0]?.registracija,
      value: props.vozila[0]?.id
    });
  }, [props.kupci]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={style.container}>
        <div
          style={{ marginLeft: '5%', display: 'flex', flexDirection: 'row' }}
        >
          <div>
            <div style={style.dateRow}>
              <span style={style.regularText}>Od Datuma:</span>
              <div style={style.regularText}>
                <KeyboardDatePicker
                  margin="none"
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  value={selectedDatePrvo}
                  onChange={handleDateChangePrvo}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </div>
              <div style={style.regularText}>
                <KeyboardTimePicker
                  ampm={false}
                  margin="none"
                  id="time-picker"
                  value={selectedDatePrvo}
                  onChange={handleDateChangePrvo}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </div>
            </div>
            <div style={{ ...style.dateRow, marginTop: 10 }}>
              <span style={style.regularText}>Do Datuma:</span>
              <div style={style.regularText}>
                <KeyboardDatePicker
                  margin="none"
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  value={selectedDateDrugo}
                  onChange={handleDateChangeDrugo}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </div>
              <div style={style.regularText}>
                <KeyboardTimePicker
                  ampm={false}
                  margin="none"
                  id="time-picker"
                  value={selectedDateDrugo}
                  onChange={handleDateChangeDrugo}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </div>
            </div>
            <div style={{ ...style.dateRowWithoutBorder, marginTop: 10 }}>
              <span style={style.regularText}>Vozilo:</span>
              <Dropdown
                onChange={onVoziloChange}
                value={selectedVozilo?.value ? selectedVozilo.value : ''}
                width={300}
                marginLeft={10}
                data={props.vozila.map(item => ({
                  title: item.registracija,
                  value: item.id
                }))}
              />
            </div>
            <div style={{ ...style.dateRowWithoutBorder, marginTop: 10 }}>
              <span style={style.regularText}>Roba: </span>
              <Dropdown
                onChange={onRobaChange}
                value={selectedRoba?.value ? selectedRoba.value : ''}
                width={300}
                marginLeft={10}
                data={props.roba.map(item => ({
                  title: item.naziv,
                  value: item.id
                }))}
              />
            </div>
            <div style={{ ...style.dateRowWithoutBorder, marginTop: 10 }}>
              <span style={style.regularText}>Partner:</span>
              <Dropdown
                onChange={onPartnerChange}
                value={selectedPartner?.value ? selectedPartner.value : ''}
                width={300}
                marginLeft={10}
                data={props.kupci.map(item => ({
                  title: item.naziv,
                  value: item.id
                }))}
              />
            </div>
          </div>
          <div
            style={{
              justifyContent: 'flex-end',
              marginLeft: 50,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Button
              onClick={handlePrint}
              disabled={!selectedVaganje}
              variant="contained"
              color="primary"
            >
              Print
            </Button>
            <Button
              style={{ marginTop: 10 }}
              onClick={handleStorniraj}
              disabled={!selectedVaganje}
              variant="contained"
              color="secondary"
            >
              Storniraj vaganje
            </Button>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <PregledTable
            setSelectedVaganje={s => setSelectedVaganje(s)}
            selectedVaganje={selectedVaganje}
            vaganja={filteredVaganja}
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default PregledVaganjaScreen;
