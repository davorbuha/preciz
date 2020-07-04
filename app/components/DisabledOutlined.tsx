/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { OutlinedInput, makeStyles } from '@material-ui/core';

interface Props {
  suffix?: string;
  width?: number;
  marginLeft?: number;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 38
  }
}));

function DisabledOutlined(p: Props, ref: any) {
  const classes = useStyles();
  const [title, setTitle] = React.useState(0);
  React.useImperativeHandle(ref, () => ({
    title,
    setTitle: (uppertitle: any) => setTitle(uppertitle)
  }));
  const suffix = React.useMemo(() => (p.suffix ? p.suffix : 'Kg'), [p.suffix]);
  return (
    <OutlinedInput
      inputProps={{
        style: {
          height: 38,
          padding: '0px 20px',
          fontSize: 16,
          lineHeight: 18
        }
      }}
      classes={{ root: classes.root }}
      style={{
        marginLeft: p.marginLeft ? p.marginLeft : 200,
        minWidth: p.width ? p.width : 100,
        height: 38
      }}
      disabled
      value={title + ' ' + suffix}
    />
  );
}

export default React.forwardRef(DisabledOutlined);
