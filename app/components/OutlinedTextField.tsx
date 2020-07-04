/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import colors from '../styles/colors';

const useStyles = makeStyles(theme => ({
  root: {
    height: 38,
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
  delete toPass.error;
  delete toPass.maxWidth;
  delete toPass.minWidth;

  return (
    <div
      style={{
        maxWidth: p.maxWidth ? p.maxWidth : undefined,
        marginLeft: p.marginLeft || p.marginLeft === 0 ? p.marginLeft : 200,
        minWidth: p.width ? p.width : 100,
        height: 38
      }}
    >
      <TextField
        inputProps={{
          style: {
            height: 38,
            padding: '0px 20px',
            fontSize: 16,
            lineHeight: 18
          }
        }}
        {...toPass}
        variant="outlined"
        classes={{ root: classes.root }}
      />
      <p style={{ marginTop: 5, fontSize: 12, color: 'red' }}>
        {p.error && p.error.message ? p.error.message : null}
      </p>
    </div>
  );
}

export default OutlinedTextField;
