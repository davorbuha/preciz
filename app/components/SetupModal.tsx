/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { makeStyles, Modal, Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import colors from '../styles/colors';
import CompanyDetails from '../types/CompanyDetails';
import setToSetupDB from '../db/setupDatabaseFunctions';

function renderErrorForField(errors: any, fieldName: string) {
  if (errors[fieldName]) {
    return (
      <p style={{ fontSize: 12, color: 'red' }}>{errors[fieldName].message}</p>
    );
  }
  return null;
}

const fields = {
  companyName: 'CompanyName',
  companyAddress: 'CompanyAddress',
  oib: 'Oib',
  phone: 'Phone',
  mail: 'Mail'
};

function submit(cb: () => voic) {
  return (maybe: any) => {
    const companyDetails = new CompanyDetails(
      maybe[fields.companyName],
      maybe[fields.companyAddress],
      maybe[fields.oib],
      maybe[fields.phone],
      maybe[fields.mail]
    );
    setToSetupDB(companyDetails, cb);
  };
}

const useStyles = makeStyles(theme => ({
  paper: ({ width, height }: any) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: colors.grey,
    boxShadow: theme.shadows[5],
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 32,
    width: `${width / 2 - 32}px`,
    height: `${height / 2 - 32}px`,
    top: `${height / 4 - 32}px`,
    left: `${width / 4 - 32}px`
  }),
  textfieldWrapperFullWidth: {
    width: '100%'
  },
  textfieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%'
  },
  inputRowWrapper: {
    marginTop: '10px',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrapper: {
    width: '80%'
  }
}));

interface Props {
  showSetupModal: boolean;
  setShowSetupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const rules = {
  [fields.companyName]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Ime tvrtke je prekratko'
    },
    maxLength: {
      value: 100,
      message: 'Ime tvrtke je predugačko'
    }
  },
  [fields.companyAddress]: {
    required: true,
    minLength: {
      value: 2,
      message: 'Adresa tvrtke je prekratka'
    },
    maxLength: {
      value: 100,
      message: 'Adresa tvrtke je predugačka'
    }
  },
  [fields.oib]: {
    minLength: {
      value: 11,
      message: 'OIB mora sadrzavati 11 znakova'
    },
    maxLength: {
      value: 11,
      message: 'OIB mora sadrzavati 11 znakova'
    }
  },
  [fields.phone]: {
    maxLength: {
      value: 100,
      message: 'Broj Telefona je predugacak'
    }
  },
  [fields.mail]: {
    maxLength: {
      value: 100,
      message: 'Email je predugacak'
    }
  }
};

function SetupModal(props: Props) {
  const { width, height } = useWindowDimensions();
  const { handleSubmit, errors, control } = useForm({
    mode: 'onChange'
  });
  const classes = useStyles({ width, height });
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      open={props.showSetupModal}
      onClose={() => {}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <h1>Unesite podatke firme:</h1>
        <div className={classes.wrapper}>
          <div className={classes.inputRowWrapper}>
            <div className={classes.textfieldWrapper}>
              <Controller
                rules={rules[fields.companyName]}
                as={TextField}
                name={fields.companyName}
                label="Ime tvrtke"
                control={control}
                defaultValue=""
              />
              {renderErrorForField(errors, fields.companyName)}
            </div>
            <div className={classes.textfieldWrapper}>
              <Controller
                rules={rules[fields.companyAddress]}
                as={TextField}
                name={fields.companyAddress}
                label="Adresa"
                control={control}
                defaultValue=""
              />
              {renderErrorForField(errors, fields.companyAddress)}
            </div>
          </div>
          <div className={classes.inputRowWrapper}>
            <div className={classes.textfieldWrapper}>
              <Controller
                rules={rules[fields.oib]}
                as={TextField}
                name={fields.oib}
                label="OIB"
                control={control}
                defaultValue=""
              />
              {renderErrorForField(errors, fields.oib)}
            </div>
            <div className={classes.textfieldWrapper}>
              <Controller
                rules={rules[fields.phone]}
                as={TextField}
                name={fields.phone}
                label="Broj telefona"
                control={control}
                defaultValue=""
              />
              {renderErrorForField(errors, fields.phone)}
            </div>
          </div>
          <div className={classes.inputRowWrapper}>
            <div className={classes.textfieldWrapperFullWidth}>
              <Controller
                rules={rules[fields.mail]}
                className={classes.textfieldWrapperFullWidth}
                as={TextField}
                name={fields.mail}
                label="Email"
                control={control}
                defaultValue=""
              />
              {renderErrorForField(errors, fields.mail)}
            </div>
          </div>
        </div>
        <Button
          onClick={handleSubmit(submit(() => props.setShowSetupModal(false)))}
          variant="contained"
          style={{ width: '40%', height: '40px' }}
          color="primary"
        >
          Spremi
        </Button>
      </div>
    </Modal>
  );
}

export default SetupModal;
