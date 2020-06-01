/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import useWindowDimensions from '../useDimensions';
import colors from '../styles/colors';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: colors.grey,
    border: '2px solid #000',
    boxShadow: theme.shadows[5]
  }
}));

interface Props {
  showSetupModal: boolean;
}

function SetupModal(props: Props) {
  const { width, height } = useWindowDimensions();
  const classes = useStyles();
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      open={props.showSetupModal}
      onClose={() => {}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        style={{
          width: width / 2,
          height: height / 2,
          top: height / 4,
          left: width / 4
        }}
        className={classes.paper}
      >
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
    </Modal>
  );
}

export default SetupModal;
