/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import colors from '../styles/colors';

function renderErrorForField(errors: any, fieldName: string) {
  if (errors[fieldName]) {
    return <p>{errors[fieldName].message}</p>;
  }
  return null;
}

const useStyles = makeStyles(theme => ({
  paper: ({ width, height }: any) => ({
    display: 'flex',
    position: 'absolute',
    backgroundColor: colors.grey,
    boxShadow: theme.shadows[5],
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2,
    height: height / 2,
    top: height / 4,
    left: width / 4
  }),
  textfieldWrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

interface Props {
  showSetupModal: boolean;
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
        <div className={classes.textfieldWrapper}>
          <Controller
            as={TextField}
            name="CompanyName"
            label="Ime Tvrtke"
            rules={{
              maxLength: {
                value: 10,
                message: 'bla bla 10'
              }
            }}
            control={control}
            defaultValue=""
          />
          {renderErrorForField(errors, 'CompanyName')}
        </div>
      </div>
    </Modal>
  );
}

export default SetupModal;
