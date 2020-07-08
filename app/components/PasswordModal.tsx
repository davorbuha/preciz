import React from 'react';
import { makeStyles, Modal, TextField, Button } from '@material-ui/core';
import colors from '../styles/colors';
import useWindowDimensions from '../useDimensions';
import MainContext from '../context/MainContext';
import OutlinedTextField from './OutlinedTextField';
import { useHistory } from 'react-router';
import { RoutesEnum } from '../routes';

const useStyles = makeStyles(theme => ({
  paper: ({ width, height }: any) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: colors.grey,
    boxShadow: theme.shadows[5],
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  passwordModal: boolean;
  setPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordModal(props: Props) {
  const history = useHistory();
  const [lozinka, setLozinka] = React.useState('');
  const [err, setErr] = React.useState(false);
  const { width, height } = useWindowDimensions();
  const classes = useStyles({ width, height });
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      open={props.passwordModal}
      onClose={() => {}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <h1>Unesite lozinku:</h1>
        <TextField
          onChange={e => setLozinka(e.target.value)}
          value={lozinka}
          label="Lozinka"
          type="password"
        />
        {err ? <p style={{ color: 'red' }}>Pogrešna lozinka</p> : null}
        <Button
          onClick={() => {
            if (lozinka === '070809') {
              setLozinka('');
              history.push(RoutesEnum.ParametriVage);
              props.setPasswordModal(false);
            } else {
              setLozinka('');
              setErr(true);
            }
          }}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </div>
    </Modal>
  );
}

export default PasswordModal;
