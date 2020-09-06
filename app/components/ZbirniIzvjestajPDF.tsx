/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CompanyDetails from '../types/CompanyDetails';
import moment, { Moment } from 'moment';

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
  }
});

interface Props {
  company: CompanyDetails;
  date1: Moment;
  date2: Moment;
  kupci?: string;
  vozilo?: string;
  roba?: string;
}

const ZbirniIzvještajPDF = (props: Props) => (
  <Document>
    <Page
      style={{ paddingLeft: 20, paddingRight: 140, display: 'flex' }}
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
          {props.kupci ? props.kupci : 'za sve kupce'}
        </Text>
        <Text style={styles.text}>
          {props.vozilo ? props.vozilo : 'za sva vozila'}
        </Text>
        <Text style={styles.text}>
          {props.roba ? props.roba : 'za svu robu'}
        </Text>
      </View>
    </Page>
  </Document>
);

export default ZbirniIzvještajPDF;
