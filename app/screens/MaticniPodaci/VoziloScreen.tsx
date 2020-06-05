import React from 'react';
import { Control, NestDataObject, FieldError } from 'react-hook-form';
import Vozilo from '../../types/Vozilo';
import { makeStyles, FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { OutlinedInput } from '@material-ui/core';

function renderErrorForField(errors: any, fieldName: string) {
  if (errors[fieldName]) {
    return (
      <p style={{ fontSize: 12, color: 'red' }}>{errors[fieldName].message}</p>
    );
  }
  return null;
}

interface Props {
  vozila: Vozilo[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
}

const fields = {
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
    minLength: {
      value: 2,
      message: 'Oznaka registracije je prekratka'
    },
    maxLength: {
      value: 100,
      message: 'Oznaka registracije je preduga'
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
      <div>
        <Controller
          rules={rules[fields.registracija]}
          as={<TextField variant="outlined" />}
          name={fields.registracija}
          label="Registracija"
          control={props.control}
          defaultValue=""
        />
        {renderErrorForField(props.errors, fields.registracija)}
      </div>
      <div className={classes.inputWrapper}>
        <Controller
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
          rules={rules[fields.tezina]}
          as={<TextField variant="outlined" />}
          name={fields.tezina}
          label="Težina"
          control={props.control}
          defaultValue=""
        />
        {renderErrorForField(props.errors, fields.tezina)}
      </div>
    </div>
  );
}

export default VoziloScreen;
