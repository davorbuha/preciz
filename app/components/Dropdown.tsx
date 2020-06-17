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

function Dropdown(p: Props) {
  const outlinedInputClasses = useOutlinedInputStyles();
  return (
    <Select
      style={{
        marginLeft: p.marginLeft ? p.marginLeft : 200,
        minWidth: p.width ? p.width : 100,
        height: 50
      }}
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
      input={<OutlinedInput classes={outlinedInputClasses} />}
      value={p.value}
      onChange={ev => p.onChange!(ev.target.value)}
    >
      {p.data.map(item => (
        <MenuItem key={item.value} value={item.value}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Dropdown;
