/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Control,
  NestDataObject,
  FieldError,
  Controller
} from 'react-hook-form';
import {
  makeStyles,
  TextField,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@material-ui/core';
import Vozac from '../../types/Vozac';

function renderErrorForField(errors: any, fieldName: string) {
  if (errors[fieldName]) {
    return (
      <p style={{ fontSize: 12, color: 'red' }}>{errors[fieldName].message}</p>
    );
  }
  return null;
}

interface Props {
  editId: number | undefined;
  vozaci: Vozac[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  deleteVozac: (i: number) => void;
  editVozac: () => void;
  addVozac: () => void;
  onEditPress: (z: Vozac, i: number) => void;
  odbaciUredivanje: () => void;
}

export const fields = {
  ime: 'Ime',
  prezime: 'Prezime',
  oib: 'OIB'
};
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '85vh',
    padding: 40,
    overflowY: 'scroll'
  },
  titlestyle: {
    marginBottom: '20px'
  },
  inputWrapper: {
    marginTop: '20px'
  },
  tableContainer: {
    marginTop: '30px'
  },
  upperScreenWrapper: {
    display: 'flex',
    flexDirection: 'row'
  }
}));
const rules = {
  [fields.ime]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Ime je prekratko'
    },
    maxLength: {
      value: 100,
      message: 'Ime je predugo'
    }
  },
  [fields.prezime]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Prezime je prekratko'
    },
    maxLength: {
      value: 100,
      message: 'Prezime je predugo'
    }
  },
  [fields.oib]: {
    required: true,
    minLength: {
      value: 11,
      message: 'Oib mora sadržavati 11 znakova'
    },
    maxLength: {
      value: 11,
      message: 'Oib sadrži više od 11 znakova'
    }
  }
};
function VozacScreen(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titlestyle}>
        <h1>VOZAČ</h1>
      </div>
      <div className={classes.upperScreenWrapper}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.ime]}
              as={<TextField variant="outlined" />}
              name={fields.ime}
              label="Ime"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.ime)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.prezime]}
              as={<TextField variant="outlined" />}
              name={fields.prezime}
              label="Prezime"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.prezime)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.oib]}
              as={<TextField variant="outlined" />}
              name={fields.oib}
              label="OIB"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.oib)}
          </div>
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Button
            onClick={
              props.editId !== undefined ? props.editVozac : props.addVozac
            }
            style={{
              backgroundColor: '#0275d8',
              color: '#fff',
              height: '50px',
              width: '150px',
              alignSelf: 'center'
            }}
            variant="contained"
          >
            Spremi
          </Button>
          {props.editId !== undefined ? (
            <Button
              onClick={props.odbaciUredivanje}
              style={{
                marginTop: '20px',
                height: '50px',
                width: '150px',
                alignSelf: 'center'
              }}
              variant="contained"
            >
              Odbaci
            </Button>
          ) : null}
        </div>
      </div>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ backgroundColor: '#cbd0d6' }}>
              <TableCell align="left">Ime</TableCell>
              <TableCell align="left">Prezime</TableCell>
              <TableCell align="left">OIB</TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.vozaci.map((item, i) => (
              <TableRow key={i} style={{ backgroundColor: '#f5f7f7' }}>
                <TableCell align="left">{item.ime}</TableCell>
                <TableCell align="left">{item.prezime}</TableCell>
                <TableCell align="left">{item.oib}</TableCell>
                <TableCell style={{ width: 30 }} align="left">
                  <Button
                    style={{ backgroundColor: '#0275d8', color: '#fff' }}
                    onClick={() => props.onEditPress(item, i)}
                    variant="contained"
                  >
                    Uredi
                  </Button>
                </TableCell>
                <TableCell style={{ width: 30 }} align="left">
                  <Button
                    style={{ backgroundColor: '#d9534f', color: '#fff' }}
                    onClick={() => props.deleteVozac(i)}
                    variant="contained"
                  >
                    Obrisi
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default VozacScreen;
