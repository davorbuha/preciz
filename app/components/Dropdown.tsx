/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Select, OutlinedInput, MenuItem, makeStyles } from '@material-ui/core';
import colors from '../styles/colors';

export type Element = {
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

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    '& $notchedOutline': {
      borderWidth: '2px',
      borderColor: colors.primary
    },
    '&:hover $notchedOutline': {
      borderWidth: '2px',
      borderColor: colors.primary
    },
    '&$focused $notchedOutline': {
      borderColor: colors.primary
    }
  },
  focused: {},
  notchedOutline: {}
}));

const useStyles = makeStyles(() => ({
  select: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 24px',
    height: '100%'
  }
}));

function Dropdown(p: Props) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  return (
    <div
      style={{
        marginLeft: p.marginLeft ? p.marginLeft : 200,
        minWidth: p.width ? p.width : 100,
        height: 38
      }}
    >
      <Select
        style={{
          minWidth: p.width ? p.width : 100,
          height: 38,
          padding: '0px 0px'
        }}
        classes={{ select: classes.select }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200
            }
          },
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          }
        }}
        input={
          <OutlinedInput
            inputProps={{
              style: {
                height: 38,
                padding: '0px 0px !important',
                fontSize: 12,
                lineHeight: 14
              }
            }}
            classes={outlinedInputClasses}
          />
        }
        value={p.value}
        onChange={ev => p.onChange!(ev.target.value)}
      >
        {p.data.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      <p style={{ marginTop: 1, fontSize: 12, color: 'red' }}>
        {p.error && p.error.message ? p.error.message : null}
      </p>
    </div>
  );
}

export default Dropdown;
