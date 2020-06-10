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
import Partner from '../../types/Partner';
import { blue } from '@material-ui/core/colors';

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
  partneri: Partner[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
  deletePartner: (i: number) => void;
  editPartner: () => void;
  addPartner: () => void;
  onEditPress: (b: Partner, i: number) => void;
  odbaciUredivanje: () => void;
}

export const fields = {
  sifra: 'Sifra',
  naziv: 'Naziv',
  ulica: 'Ulica',
  grad: 'Grad',
  telefon: 'Telefon',
  fax: 'Fax',
  email: 'Email',
  napomena: 'Napomena'
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
    overflow: 'visible',
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
  },
  [fields.ulica]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Naziv ulice prekratak'
    },
    maxLength: {
      value: 100,
      message: 'Naziv ulice je predug'
    }
  },
  [fields.grad]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Naziv grada prekratak'
    },
    maxLength: {
      value: 100,
      message: 'Naziv grada je predug'
    }
  },
  [fields.telefon]: {
    maxLength: {
      value: 100,
      message: 'Broj Telefona je predugacak'
    }
  },
  [fields.email]: {
    maxLength: {
      value: 100,
      message: 'Email je predugacak'
    }
  }
};

function PartnerScreen(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titlestyle}>
        <h1>PARTNER</h1>
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
              rules={rules[fields.sifra]}
              as={<TextField variant="outlined" />}
              name={fields.sifra}
              label="Šifra"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.sifra)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.ulica]}
              as={<TextField variant="outlined" />}
              name={fields.ulica}
              label="Ulica"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.ulica)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.grad]}
              as={<TextField variant="outlined" />}
              name={fields.grad}
              label="Grad"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.grad)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.telefon]}
              as={<TextField variant="outlined" />}
              name={fields.telefon}
              label="Telefon"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.telefon)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.fax]}
              as={<TextField variant="outlined" />}
              name={fields.fax}
              label="Fax"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.fax)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.email]}
              as={<TextField variant="outlined" />}
              name={fields.email}
              label="Email"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.email)}
          </div>
          <div className={classes.inputWrapper}>
            <Controller
              style={{ width: '70%', zIndex: 2 }}
              rules={rules[fields.napomena]}
              as={<TextField variant="outlined" />}
              name={fields.napomena}
              label="Napomena"
              control={props.control}
              defaultValue=""
            />
            {renderErrorForField(props.errors, fields.napomena)}
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
              props.editId !== undefined ? props.editPartner : props.addPartner
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
        <Table style={{ height: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Naziv</TableCell>
              <TableCell align="left">Šifra</TableCell>
              <TableCell align="left">Ulica</TableCell>
              <TableCell align="left">Grad</TableCell>
              <TableCell align="left">Telefon</TableCell>
              <TableCell align="left">Fax</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Napomena</TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
              <TableCell style={{ width: 30 }} align="left">
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.partneri.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="left">{item.naziv}</TableCell>
                <TableCell align="left">{item.sifra}</TableCell>
                <TableCell align="left">{item.ulica}</TableCell>
                <TableCell align="left">{item.grad}</TableCell>
                <TableCell align="left">{item.telefon}</TableCell>
                <TableCell align="left">{item.fax}</TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="left">{item.napomena}</TableCell>
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
                    onClick={() => props.deletePartner(i)}
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

export default PartnerScreen;
