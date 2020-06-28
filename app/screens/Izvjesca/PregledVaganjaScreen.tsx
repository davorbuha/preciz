/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
import React from 'react';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { PregledType } from '../../containers/Izvjesca/PregledVaganja';
import PregledTable from '../../components/PregledTable';
import colors from '../../styles/colors';
import Partner from '../../types/Partner';
import Roba from '../../types/Roba';
import Vozilo from '../../types/Vozilo';
import Dropdown from '../../components/Dropdown';

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
    marginLeft: '5%',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 4,
    borderStyle: 'solid'
  },
  dateRowWithoutBorder: {
    display: 'flex',
    flexDirection: 'row',
    width: '500px',
    marginLeft: '5%',
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
}

const useStyles = makeStyles(() => ({
  tableContainer: {
    marginTop: '30px'
  }
}));

function PregledVaganjaScreen(props: Props) {
  const [selectedDatePrvo, setSelectedDatePrvo] = React.useState<Date | null>(
    null
  );
  const [selectedDateDrugo, setSelectedDateDrugo] = React.useState<Date | null>(
    null
  );
  const handleDateChangePrvo = (date: Date | null) => {
    setSelectedDatePrvo(date);
  };
  const handleDateChangeDrugo = (date: Date | null) => {
    setSelectedDateDrugo(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={style.container}>
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
          <span style={style.regularText}>Roba: </span>
          <Dropdown
            data={props.roba.map(item => ({
              title: item.naziv,
              value: item.id
            }))}
          />
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
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <PregledTable vaganja={props.vaganja} />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default PregledVaganjaScreen;
