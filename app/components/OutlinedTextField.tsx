/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import colors from '../styles/colors';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: colors.primary
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: colors.primary
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: colors.primary
    }
  }
}));

function OutlinedTextField(p: any) {
  const classes = useStyles();
  const toPass = { ...p };
  delete toPass.marginLeft;
  delete toPass.width;

  return (
    <TextField
      style={{
        marginLeft: p.marginLeft ? p.marginLeft : 200,
        minWidth: p.width ? p.width : 100,
        height: 50
      }}
      {...toPass}
      variant="outlined"
      classes={{ root: classes.root }}
    />
  );
}

export default OutlinedTextField;
