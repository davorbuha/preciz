/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import colors from '../styles/colors';
import { Button } from '@material-ui/core';

interface Props {
  brutto?: string;
  tara?: string;
  neto?: string;
  masa?: string;
}

function IzvaganaMasaComponent(p: Props) {
  return (
    <div
      style={{
        marginTop: 30,
        marginLeft: 50,
        borderWidth: '2px',
        borderColor: colors.primary,
        borderStyle: 'solid',
        width: '100%',
        padding: 10
      }}
    >
      <p>Izvagana masa je:</p>
      <div
        style={{
          marginTop: 10,
          display: 'flex',
          flex: 1,
          flexFlow: 'column',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 36,
            fontSize: 20,
            marginTop: 20
          }}
        >
          Brutto: {p.brutto}
        </span>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15
          }}
        >
          <span style={{ fontSize: 20 }}>Tara: {p.tara}</span>
          <Button variant="contained" color="primary">
            Prekini
          </Button>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15
          }}
        >
          <span style={{ fontSize: 20 }}>Neto: {p.neto}</span>
          <Button variant="contained" color="primary">
            Spremi Vaganje
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IzvaganaMasaComponent;
