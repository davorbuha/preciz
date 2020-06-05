/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { makeStyles, Modal, Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import colors from '../styles/colors';

function renderErrorForField(errors: any, fieldName: string) {
  if (errors[fieldName]) {
    return <p style={{fontSize: 12, color: 'red'}}>{errors[fieldName].message}</p>;
  }
  return null;
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
    width: ((width / 2) - 32) + 'px',
    height: ((height / 2)-32) + 'px',
    top: ((height / 4)-32) + 'px',
    left: ((width / 4)-32) + 'px'
  }),
  textfieldWrapperFullWidth:{
    width: '100%'
  },
  textfieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%'
  },
  inputRowWrapper: {
    marginTop: '10px',
    display: "flex",
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
}

const rules = {
  CompanyName: {
    required: true,
    minLength: {
      value: 2,
      message: "Ime tvrtke je pre kratko"
    },
    maxLength: {
      value: 100,
      message: "Ime tvrtke je pre dugačko"
    }
  },
  CompanyAddress: {
    required: true,
    minLength: {
      value: 2,
      message: "Adresa tvrtke je pre kratka"
    },
    maxLength: {
      value: 100,
      message: "Adresa tvrtke je pre dugačka"
    }
  },
  Oib: {
    minLength: {
      value: 11,
      message: "OIB mora sadrzavati 11 znakova"
    },
    maxLength: {
      value: 11,
      message: "OIB mora sadrzavati 11 znakova"
    }
  },
  Telephone: {
    maxLength: {
      value: 100,
      message: "Broj Telefona je pre dugacak"
    }
  },
  Email: {
    maxLength: {
      value: 100,
      message: "Email je pre dugacak"
    }
  }
}

//Ime tvrtke, adresa, oib, telefon, mail

function SetupModal(props: Props) {
  const { width, height } = useWindowDimensions();
  const { register, handleSubmit, watch, errors, control } = useForm({
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
            rules={rules.CompanyName}
            as={TextField}
            name="CompanyName"
            label="Ime tvrtke"
            control={control}
            defaultValue=""
          />
          {renderErrorForField(errors, 'CompanyName')}
        </div>
        <div className={classes.textfieldWrapper}>
          <Controller
            rules={rules.CompanyAddress}
            as={TextField}
            name="CompanyAddress"
            label="Adresa"
            control={control}
            defaultValue=""
          />
          {renderErrorForField(errors, 'CompanyAddress')}
        </div>
        </div>
        <div className={classes.inputRowWrapper}>
        <div className={classes.textfieldWrapper}>
          <Controller
            rules={rules.Oib}
            as={TextField}
            name="Oib"
            label="OIB"
            control={control}
            defaultValue=""
          />
          {renderErrorForField(errors, 'Oib')}
        </div>
        <div className={classes.textfieldWrapper}>
          <Controller
            rules={rules.Telephone}
            as={TextField}
            name="Telephone"
            label="Broj telefona"
            control={control}
            defaultValue=""
          />
          {renderErrorForField(errors, 'Telephone')}
        </div>
        </div>
        <div className={classes.inputRowWrapper}>
        <div className={classes.textfieldWrapperFullWidth}>
          <Controller
            rules={rules.Email}
            className={classes.textfieldWrapperFullWidth}
            as={TextField}
            name="Email"
            label="Email"
            control={control}
            defaultValue=""
          />
          {renderErrorForField(errors, 'Email')}
        </div>
        </div>
        </div>
        <Button onClick={handleSubmit((a) => console.log(a))} variant="contained" style={{width: '40%', height: '40px'}} color="primary">
          Spremi
        </Button>
      </div>
    </Modal>
  );
}

export default SetupModal;
