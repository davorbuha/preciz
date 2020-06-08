/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Dialog,
  useMediaQuery,
  useTheme,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

interface Props {
  errorText: string | undefined;
  handleClose: () => void;
}

function ErrorDialog(props: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      open={props.errorText !== undefined}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Greška</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.errorText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;
