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
import MjestoIsporuke from '../../types/MjestoIsporuke';

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
  mjesta: MjestoIsporuke[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  deleteMjestoIsporuke: (i: number) => void;
  editMjestoIsporuke: () => void;
  addMjestoIsporuke: () => void;
  onEditPress: (m: MjestoIsporuke, i: number) => void;
  odbaciUredivanje: () => void;
}

export const fields = {
  naziv: 'Naziv'
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
      message: 'Naziv mjesta je prekratak'
    },
    maxLength: {
      value: 100,
      message: 'Naziv mjesta je predug'
    }
  }
};
function MjestoIsporukeScreen(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titlestyle}>
        <h1>MJESTO ISPORUKE</h1>
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
                ? props.editMjestoIsporuke
                : props.addMjestoIsporuke
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
              Odbaci
            </Button>
          ) : null}
        </div>
      </div>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#cbd0d6' }}>
              <TableCell align="left">Naziv</TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.mjesta.map((item, i) => (
              <TableRow key={i} style={{ backgroundColor: '#f5f7f7' }}>
                <TableCell align="left">{item.naziv}</TableCell>
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
                    onClick={() => props.deleteMjestoIsporuke(i)}
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

export default MjestoIsporukeScreen;
