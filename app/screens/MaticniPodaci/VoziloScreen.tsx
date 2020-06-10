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
  InputAdornment,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@material-ui/core';
import Vozilo from '../../types/Vozilo';

function renderErrorForField(errors: any, fieldName: string) {
  if (errors[fieldName]) {
    return (
      <p style={{ fontSize: 12, color: 'red' }}>{errors[fieldName].message}</p>
    );
  }
  return null;
}

const endAdornment = {
  endAdornment: <InputAdornment position="end">Kg</InputAdornment>
};

interface Props {
  editId: number | undefined;
  vozila: Vozilo[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  deleteVozilo: (i: number) => void;
  editVozilo: () => void;
  addVozilo: () => void;
  onEditPress: (v: Vozilo, i: number) => void;
  odbaciUredivanje: () => void;
}

export const fields = {
  registracija: 'Registracija',
  tipVozila: 'TipVozila',
  tezina: 'Tezina'
};
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 40
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
  [fields.registracija]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Oznaka registracije je prekratka'
    },
    maxLength: {
      value: 100,
      message: 'Oznaka registracije je preduga'
    }
  },
  [fields.tipVozila]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Ime vozila prekratko'
    },
    maxLength: {
      value: 100,
      message: 'Ime vozila predugo'
    }
  },
  [fields.tezina]: {
    required: true,
    pattern: {
      value: /^\d+$/,
      message: 'Unesite samo brojke'
    }
  }
};
function VoziloScreen(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titlestyle}>
        <h1>VOZILO</h1>
      </div>
      <div className={classes.upperScreenWrapper}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.registracija]}
              as={<TextField style={{ zIndex: 2 }} variant="outlined" />}
              name={fields.registracija}
              label="Registracija"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.registracija)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.tipVozila]}
              as={<TextField variant="outlined" />}
              name={fields.tipVozila}
              label="Tip vozila"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.tipVozila)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.tezina]}
              as={<TextField InputProps={endAdornment} variant="outlined" />}
              name={fields.tezina}
              label="Težina"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.tezina)}
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
              props.editId !== undefined ? props.editVozilo : props.addVozilo
            }
            style={{
              color: '#fff',
              backgroundColor: '#0275d8',
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
              Odbaci Uređivanje
            </Button>
          ) : null}
        </div>
      </div>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Registracija</TableCell>
              <TableCell align="left">Tip vozila</TableCell>
              <TableCell align="left">Težina</TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.vozila.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="left">{item.registracija}</TableCell>
                <TableCell align="left">{item.tipVozila}</TableCell>
                <TableCell align="left">{item.tezina} Kg</TableCell>
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
                    onClick={() => props.deleteVozilo(i)}
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

export default VoziloScreen;
