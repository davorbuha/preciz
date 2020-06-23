/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@material-ui/core';
import PrvoVaganje from '../../types/PrvoVaganje';
import colors from '../../styles/colors';

interface Props {
  prvaVaganja: PrvoVaganje[];
}

const useStyles = makeStyles(theme => ({
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '85vh',
    padding: '20px 50px',
    overflowY: 'scroll'
  },
  tr: {
    background: 'red',
    '&:hover': {
      background: 'blue'
    }
  },
  tableContainer: {
    marginTop: '30px'
  },
  weigthingDataTitle: {
    marginBottom: 10,
    color: colors.primary
  },
  formcontrol: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 50
  },
  span: {
    minWidth: 160,
    fontSize: 20
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputRow: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

function DrugoVaganjeScreen(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titleRow}>
        <h2>Drugo vaganje</h2>
      </div>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">Registracija</TableCell>
              <TableCell align="left">Vozač</TableCell>
              <TableCell align="left">Dobavljač</TableCell>
              <TableCell align="left">Roba</TableCell>
              <TableCell align="left">Mjesto isporuke</TableCell>
              <TableCell align="left">Broj naloga </TableCell>
              <TableCell align="left">Vrijeme</TableCell>
              <TableCell align="left">Masa (kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.prvaVaganja.map((item, i) => (
              <TableRow className={classes.tr} key={item.id}>
                <TableCell align="left">{item.registracija}</TableCell>
                <TableCell align="left">{item.vozac}</TableCell>
                <TableCell align="left">{item.dobavljac}</TableCell>
                <TableCell align="left">{item.roba}</TableCell>
                <TableCell align="left">{item.mjestoIsporuke}</TableCell>
                <TableCell align="left">{item.brojNaloga}</TableCell>
                <TableCell align="left">
                  {item.ts.format('DD.MM.YYYY HH:mm')}
                </TableCell>
                <TableCell align="left">{item.bruto}</TableCell>

                {/* <TableCell style={{ width: 30 }} align="left">
                  <Button
                    style={{ backgroundColor: '#d9534f', color: '#fff' }}
                    onClick={() => props.deleteRoba(i)}
                    variant="contained"
                  >
                    Obrisi
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DrugoVaganjeScreen;
