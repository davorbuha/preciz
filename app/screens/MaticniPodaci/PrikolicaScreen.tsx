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
import Prikolica from '../../types/Prikolica';

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
  prikolice: Prikolica[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  deletePrikolice: (i: number) => void;
  editPrikolica: () => void;
  addPrikolica: () => void;
  onEditPress: (p: Prikolica, i: number) => void;
  odbaciUredivanje: () => void;
}
export const fields = {
  registracijaPrikolice: 'RegistracijaPrikolice',
  tipPrikolice: 'TipPrikolice',
  tezinaPrikolice: 'TezinaPrikolice'
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
  [fields.registracijaPrikolice]: {
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
  [fields.tipPrikolice]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Ime prikolice prekratko'
    },
    maxLength: {
      value: 100,
      message: 'Ime prikolice predugo'
    }
  },
  [fields.tezinaPrikolice]: {
    required: true,
    pattern: {
      value: /^\d+$/,
      message: 'Unesite samo brojke'
    }
  }
};

function PrikolicaScreen(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titlestyle}>
        <h1>PRIKOLICA</h1>
      </div>
      <div className={classes.upperScreenWrapper}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div>
            <Controller
              style={{ width: '70%' }}
              rules={rules[fields.registracijaPrikolice]}
              as={<TextField variant="outlined" />}
              name={fields.registracijaPrikolice}
              label="Registracija prikolice"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.registracijaPrikolice)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%' }}
              rules={rules[fields.tipPrikolice]}
              as={<TextField variant="outlined" />}
              name={fields.tipPrikolice}
              label="Tip prikolice"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.tipPrikolice)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%' }}
              rules={rules[fields.tezinaPrikolice]}
              as={<TextField InputProps={endAdornment} variant="outlined" />}
              name={fields.tezinaPrikolice}
              label="Težina prikolice"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.tezinaPrikolice)}
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
              props.editId !== undefined
                ? props.editPrikolica
                : props.addPrikolica
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
              <TableCell align="left">Tip prikolice</TableCell>
              <TableCell align="left">Težina prikolice</TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.prikolice.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="left">{item.registracijaPrikolice}</TableCell>
                <TableCell align="left">{item.tipPrikolice}</TableCell>
                <TableCell align="left">{item.tezinaPrikolice} Kg</TableCell>
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
                    onClick={() => props.deletePrikolice(i)}
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

export default PrikolicaScreen;
