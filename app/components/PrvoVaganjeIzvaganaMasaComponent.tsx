/* eslint-disable prefer-template */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { History } from 'history';
import colors from '../styles/colors';
import MainContext from '../context/MainContext';
import { RoutesEnum } from '../routes';

interface Props {
  masa?: string;
  vrijednostVage: string;
  mirnaVaga: boolean;
  getValues: (key: string) => string;
  history: History;
  handleSpremiPress: () => void;
}

function PrvoVaganjeIzvaganaMasaComponent(p: Props) {
  const { state } = React.useContext(MainContext);
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
      <p>Izvagana masa je: {p.vrijednostVage}</p>
      <p style={{ fontSize: 16, margin: '10px 0px' }}>
        {p.mirnaVaga ? 'Vaga je mirna' : 'Vaga nije mirna'}
      </p>
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
          <Button
            onClick={() => p.history.push(RoutesEnum.Home)}
            variant="contained"
            color="secondary"
          >
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
          <Button
            disabled={!p.mirnaVaga}
            onClick={p.handleSpremiPress}
            variant="contained"
            color="primary"
          >
            Spremi Vaganje
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter<any, any>(PrvoVaganjeIzvaganaMasaComponent);
