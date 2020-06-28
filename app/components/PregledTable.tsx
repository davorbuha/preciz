/* eslint-disable import/no-cycle */
import React from 'react';
import {
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { PregledType } from '../containers/Izvjesca/PregledVaganja';
import useWindowDimensions from '../useDimensions';

interface Props {
  vaganja: PregledType[];
}

const useStyles = makeStyles(() => ({
  tableContainer: {
    display: 'flex',
    marginTop: '30px',
    maxHeight: '500px',
    boxSizing: 'border-box',
    overflow: 'scroll'
  }
}));

const style = {
  cellStyle: {
    minWidth: 70
  }
};

function PregledTable({ vaganja }: Props) {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  return (
    <TableContainer
      style={{ maxWidth: width * 0.9 }}
      className={classes.tableContainer}
      component={Paper}
    >
      <Table stickyHeader style={{ overflow: 'scroll' }}>
        <TableHead>
          <TableRow style={{ backgroundColor: '#cbd0d6' }}>
            <TableCell style={style.cellStyle} align="left">
              Registracija
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Datum 1
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Datum 2
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Prikolica
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Vozač
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Šifra robe
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Roba
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Kupac
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Brutto
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Tara
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Neto
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Ulaz/Izlaz
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Mjesto isporuke
            </TableCell>
            <TableCell style={style.cellStyle} align="left">
              Broj naloga
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vaganja.map(vaganje => (
            <TableRow key={vaganje.id}>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.registracija}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.ts1.format('DD.MM.YYYY HH:mm')}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.ts2.format('DD.MM.YYYY HH:mm')}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.prikolica}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.vozac}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.sifraRobe}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.roba}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.dobavljac}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.bruto}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.tara}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.neto}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.tip}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.mjestoIsporuke}
              </TableCell>
              <TableCell style={style.cellStyle} align="left">
                {vaganje.brojNaloga}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PregledTable;
