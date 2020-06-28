/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Modal, makeStyles, Button } from '@material-ui/core';
import ptp from 'pdf-to-printer';
import useWindowDimensions from '../useDimensions';
import colors from '../styles/colors';

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
  })
}));

interface Props {
  show: boolean;
  hide: () => void;
  pathPrvo: string;
  pathDrugo: string;
  pathUkupni: string;
}

function VaganjeSpremljenoModalUnos(p: Props) {
  const { width, height } = useWindowDimensions();
  const classes = useStyles({ width, height });
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      open={p.show}
      onClose={p.hide}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <p />
        <p>VAGANJE JE SPREMLJENO</p>
        <div>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 20
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                ptp.print(p.pathUkupni);
              }}
            >
              Print ukupnog izvještaja
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                ptp.print(p.pathPrvo);
              }}
            >
              Print prvog izvještaja
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                ptp.print(p.pathDrugo);
              }}
            >
              Print drugog izvještaja
            </Button>
          </div>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Button variant="contained" color="secondary" onClick={p.hide}>
              Izađi
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default VaganjeSpremljenoModalUnos;
