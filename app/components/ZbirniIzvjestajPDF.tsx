/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment, { Moment } from 'moment';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CompanyDetails from '../types/CompanyDetails';
import { PregledType } from '../containers/Izvjesca/PregledVaganja';
import colors from '../styles/colors';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  row: { flexDirection: 'row' },
  zaglavlje: {
    width: '100%',
    margin: '30px 0px 0px 0px',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black'
  },
  text: {
    fontSize: 8,
    fontWeight: 600,
    fontFamily: 'Poppins-Bold'
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    display: 'flex'
  },
  naslov: {
    alignSelf: 'center'
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    borderWidth: '1px',
    borderColor: 'black',
    borderStyle: 'solid'
  }
});

interface Props {
  company: CompanyDetails;
  date1: Moment;
  date2: Moment;
  filtered: PregledType[];
  kupci?: string;
  vozilo?: string;
  roba?: string;
}

const ZbirniIzvještajPDF = (props: Props) => (
  <Document>
    <Page
      style={{ paddingLeft: 20, paddingRight: 100, display: 'flex' }}
      size="A4"
      orientation="landscape"
    >
      <View style={styles.zaglavlje}>
        <View style={styles.rowStyle}>
          <View>
            <Text style={styles.text}>{props.company.companyName}</Text>
            <Text style={styles.text}>{props.company.address}</Text>
            <Text style={styles.text}>Telefon: {props.company.phone}</Text>
            <Text style={styles.text}>Email: {props.company.mail}</Text>
          </View>
          <Text style={styles.text}>
            Datum: {moment().format('DD.MM.YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={[styles.naslov, styles.text, { marginTop: 18 }]}>
          Pregled vaganja od {props.date1.format('DD.MM.YYYY')} do{' '}
          {props.date2.format('DD.MM.YYYY')}
        </Text>
        <Text style={styles.text}>
          {props.kupci ? 'Kupac: ' + props.kupci : 'za sve kupce'}
        </Text>
        <Text style={styles.text}>
          {props.vozilo ? 'Vozilo: ' + props.vozilo : 'za sva vozila'}
        </Text>
        <Text style={styles.text}>
          {props.roba ? 'Roba: ' + props.roba : 'za svu robu'}
        </Text>
        <View style={{ marginTop: 20, display: 'flex' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.cell}>
              <Text style={[styles.text]}>Redni broj</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.text]}>Datum</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.text]}>Vrijeme</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.text]}>Registracija</Text>
            </View>
            <View style={[styles.cell, { width: 140 }]}>
              <Text style={[styles.text]}>Vozač</Text>
            </View>
            <View style={[styles.cell, { width: 180 }]}>
              <Text style={[styles.text]}>Kupac-Dobavljač</Text>
            </View>
            <View style={[styles.cell, { width: 180 }]}>
              <Text style={[styles.text]}>Roba</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>Masa 1</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>Masa 2</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>Neto</Text>
            </View>
          </View>
          <View>
            {props.filtered.map((item, i) => (
              <View key={'zbirniRow' + i} style={{ flexDirection: 'row' }}>
                <View style={styles.cell}>
                  <Text style={[styles.text]}>{item.brojVaganja}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[styles.text]}>
                    {item.ts2.format('DD.MM.YYYY')}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[styles.text]}>{item.ts2.format('HH:mm')}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[styles.text]}>{item.registracija}</Text>
                </View>
                <View style={[styles.cell, { width: 140 }]}>
                  <Text style={[styles.text]}>{item.vozac}</Text>
                </View>
                <View style={[styles.cell, { width: 180 }]}>
                  <Text style={[styles.text]}>{item.dobavljac}</Text>
                </View>
                <View style={[styles.cell, { width: 180 }]}>
                  <Text style={[styles.text]}>{item.roba}</Text>
                </View>
                <View style={[styles.cell]}>
                  <Text style={[styles.text]}>
                    {item.tip === 'Ulaz' ? item.bruto : item.tara}
                  </Text>
                </View>
                <View style={[styles.cell]}>
                  <Text style={[styles.text]}>
                    {item.tip === 'Ulaz' ? item.tara : item.bruto}
                  </Text>
                </View>
                <View style={[styles.cell]}>
                  <Text style={[styles.text]}>{item.neto}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ZbirniIzvještajPDF;
