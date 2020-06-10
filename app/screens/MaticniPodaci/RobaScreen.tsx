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
  InputAdornment,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@material-ui/core';
import Roba from '../../types/Roba';

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
  robe: Roba[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  deleteRoba: (i: number) => void;
  editRoba: () => void;
  addRoba: () => void;
  onEditPress: (r: Roba, i: number) => void;
  odbaciUredivanje: () => void;
}

export const fields = {
  sifraRobe: 'SifraRobe',
  naziv: 'Naziv',
  jedinicaMjere: 'JedinicaMjere'
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
  [fields.naziv]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Naziv je prekratak'
    },
    maxLength: {
      value: 100,
      message: 'Naziv je predug'
    }
  }
};

function RobaScreen(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titlestyle}>
        <h1>ROBA</h1>
      </div>
      <div className={classes.upperScreenWrapper}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.naziv]}
              as={<TextField style={{ zIndex: 2 }} variant="outlined" />}
              name={fields.naziv}
              label="Naziv"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.naziv)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              as={<TextField variant="outlined" />}
              name={fields.sifraRobe}
              label="Šifra robe"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.sifraRobe)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              as={
                <TextField
                  variant="outlined"
                  disabled
                  InputProps={endAdornment}
                />
              }
              name={fields.jedinicaMjere}
              label="Jedinica mjere"
              InputLabelProps={{
                shrink: true
              }}
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.jedinicaMjere)}
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
              props.editId !== undefined ? props.editRoba : props.addRoba
            }
            style={{
              height: '50px',
              width: '150px',
              alignSelf: 'center',
              color: '#fff',
              backgroundColor: '#0275d8'
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
              <TableCell align="left">Šifra robe</TableCell>
              <TableCell align="left">Naziv</TableCell>
              <TableCell align="left">Jedinica mjere</TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.robe.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="left">{item.sifraRobe}</TableCell>
                <TableCell align="left">{item.naziv}</TableCell>
                <TableCell align="left">{item.jedinicaMjere} kg</TableCell>
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
                    onClick={() => props.deleteRoba(i)}
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

export default RobaScreen;
