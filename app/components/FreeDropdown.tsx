/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, makeStyles } from '@material-ui/core';
import colors from '../styles/colors';

type Element = {
  title: string;
  value: any;
};

interface Props {
  data: Element[];
  value?: any;
  onChange?: (val: any) => void;
  width?: number;
  marginLeft?: number;
  error?: any;
}

const useStyles = makeStyles(theme => ({
  listbox: {
    maxHeight: 200,
    '& ul': {
      padding: 0,
      margin: 0
    }
  },
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

function FreeDropdown(p: Props) {
  const classes = useStyles();
  return (
    <div
      style={{
        marginLeft: p.marginLeft ? p.marginLeft : 200,
        minWidth: p.width ? p.width : 100,
        height: 50
      }}
    >
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        classes={{ listbox: classes.listbox }}
        onChange={(ev, val) => p.onChange!(val)}
        onInputChange={ev => p.onChange!((ev.target as any).value)}
        options={p.data.map(option => option.title)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            classes={{ root: classes.root }}
          />
        )}
      />
      <p style={{ marginTop: 1, fontSize: 12, color: 'red' }}>
        {p.error && p.error.message ? p.error.message : null}
      </p>
    </div>
  );
}

export default FreeDropdown;
