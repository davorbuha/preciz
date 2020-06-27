/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'react-router';
import { Button } from '@material-ui/core';
import { History } from 'history';
import colors from '../styles/colors';
import OutlinedTextField from './OutlinedTextField';
import { RoutesEnum } from '../routes';
import { fields } from '../screens/Vaganja/UnosVaganjaScreen';

const style = {
  regularText: {
    fontSize: 16,
    padding: '0px 10px',
    margin: '10px 0px',
    width: '28%',
    display: 'flex'
  }
};

interface Props {
  history: History;
  control: any;
  handleSpremiPress: (
    selectedDatePrvo: Date | null,
    selectedDateDrugo: Date | null
  ) => void;
}

function UnosVaganjaComponent(props: Props) {
  const [selectedDatePrvo, setSelectedDatePrvo] = React.useState<Date | null>(
    new Date()
  );
  const [selectedDateDrugo, setSelectedDateDrugo] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChangePrvo = (date: Date | null) => {
    setSelectedDatePrvo(date);
  };
  const handleDateChangeDrugo = (date: Date | null) => {
    setSelectedDateDrugo(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div
        style={{
          marginTop: 30,
          marginLeft: 50,
          borderWidth: '2px',
          borderColor: colors.primary,
          borderStyle: 'solid',
          width: '100%',
          padding: 10
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p
            style={{
              fontSize: 16,
              padding: '0px 10px',
              margin: '10px 0px',
              minWidth: '16%'
            }}
          />
          <p style={style.regularText}>Datum:</p>
          <p style={style.regularText}>Vrijeme:</p>
          <p style={style.regularText}>Masa:</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <p
            style={{
              fontSize: 16,
              padding: '0px 10px',
              margin: '10px 0px',
              minWidth: '16%'
            }}
          >
            Prvo vaganje
          </p>
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
            {' '}
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
          <div
            style={{
              maxWidth: '24%',
              ...style.regularText,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Controller
              rules={{ required: { value: true, message: 'Obavezan unos' } }}
              control={props.control}
              name={fields.vaganje1}
              as={
                <OutlinedTextField marginLeft={1} maxWidth={100} minWidth={1} />
              }
            />
            <span style={{ marginLeft: 5 }}>kg</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <p
            style={{
              fontSize: 16,
              padding: '0px 10px',
              margin: '10px 0px',
              minWidth: '16%'
            }}
          >
            Drugo vaganje
          </p>
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
            {' '}
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
          <div
            style={{
              maxWidth: '24%',
              ...style.regularText,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Controller
              rules={{ required: { value: true, message: 'Obavezan unos' } }}
              control={props.control}
              name={fields.vaganje2}
              as={
                <OutlinedTextField marginLeft={1} maxWidth={100} minWidth={1} />
              }
            />
            <span style={{ marginLeft: 5 }}>kg</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            onClick={() => props.history.push(RoutesEnum.Home)}
            variant="contained"
            color="secondary"
          >
            Prekini
          </Button>
          <Button
            onClick={() =>
              props.handleSpremiPress(selectedDatePrvo, selectedDateDrugo)
            }
            variant="contained"
            color="primary"
          >
            Spremi Vaganje
          </Button>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default withRouter<any, any>(UnosVaganjaComponent);
