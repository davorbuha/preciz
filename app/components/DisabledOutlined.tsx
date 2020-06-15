/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { OutlinedInput } from '@material-ui/core';

interface Props {
  suffix?: string;
  width?: number;
  marginLeft?: number;
}

function DisabledOutlined(p: Props, ref: any) {
  const [title, setTitle] = React.useState(0);
  React.useImperativeHandle(ref, () => ({
    setTitle: (uppertitle: any) => setTitle(uppertitle)
  }));
  const suffix = React.useMemo(() => (p.suffix ? p.suffix : 'Kg'), [p.suffix]);
  return (
    <OutlinedInput
      style={{
        marginLeft: p.marginLeft ? p.marginLeft : 200,
        minWidth: p.width ? p.width : 100,
        height: 50
      }}
      disabled
      value={title + ' ' + suffix}
    />
  );
}

export default React.forwardRef(DisabledOutlined);
