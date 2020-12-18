/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { Moment } from 'moment';
import CompanyDetails from '../types/CompanyDetails';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF'
  },
  row: { flexDirection: 'row' },
  zaglavlje: {
    width: '100%',
    margin: '30px 20px 0px 20px',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black'
  },
  text: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'Poppins-Bold'
  },
  regularText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12
  },
  body: {
    margin: '20px 20px'
  },
  minWidth: {
    minWidth: '110px'
  },
  rowSignature: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export interface Detalji {
  tip: string;
  registracija: string;
  prikolica: string;
  vozac: string;
  dobavljac: string;
  roba: string;
  vlaga?: string;
  mjestoIsporuke: string;
  brojNalog: string;
}

interface Props {
  brojVaganja?: number;
  company: CompanyDetails;
  detalji: Detalji;
  bruto: number;
  ts: Moment;
  image?: string;
}

// Create Document Component
const PrvoVaganjePDF = (props: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.zaglavlje}>
        <Text style={styles.text}>{props.company.companyName}</Text>
        <Text style={styles.text}>{props.company.address}</Text>
        <Text style={styles.text}>Telefon: {props.company.phone}</Text>
        <Text style={styles.text}>Email: {props.company.mail}</Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.regularText]}>
          Vaganje broj: {props.brojVaganja ? props.brojVaganja : 1}
        </Text>
        <Text
          style={[
            styles.regularText,
            { marginBottom: 20, alignSelf: 'center' }
          ]}
        >
          Tip vaganja (Ulaz / Izlaz): {props.detalji.tip}
        </Text>
        <View style={styles.row}>
          <Text style={[styles.regularText, styles.minWidth]}>
            Registracija:
          </Text>
          <Text style={styles.regularText}>{props.detalji.registracija}</Text>
          <Text
            style={[styles.regularText, styles.minWidth, { marginLeft: 60 }]}
          >
            Prikolica:
          </Text>
          <Text style={styles.regularText}>{props.detalji.prikolica}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.regularText, styles.minWidth]}>Vozac:</Text>
          <Text style={styles.regularText}>{props.detalji.vozac}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.regularText, styles.minWidth]}>
            Dobavljac/Kupac:
          </Text>
          <Text style={styles.regularText}>{props.detalji.dobavljac}</Text>
        </View>
        {props.detalji.vlaga ? (
          <View style={styles.row}>
            <Text style={[styles.regularText, styles.minWidth]}>Vlaga:</Text>
            <Text style={styles.regularText}>{props.detalji.vlaga}</Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={[styles.regularText, styles.minWidth]}>Roba:</Text>
          <Text style={styles.regularText}>{props.detalji.roba}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.regularText, styles.minWidth]}>
            Mjesto Isporuke:
          </Text>
          <Text style={styles.regularText}>{props.detalji.mjestoIsporuke}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.regularText, styles.minWidth]}>Broj Nalog:</Text>
          <Text style={styles.regularText}>{props.detalji.brojNalog}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.row}>
            <Text style={[styles.regularText, styles.minWidth]}>Datum: </Text>
            <Text style={styles.regularText}>
              {props.ts.format('DD.MM.YYYY')}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.regularText, styles.minWidth]}>Vrijeme: </Text>
            <Text style={styles.regularText}>{props.ts.format('HH:mm')}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View style={styles.row}>
            <Text style={[styles.regularText, styles.minWidth]}>Bruto:</Text>
            <Text style={styles.regularText}>{props.bruto} kg</Text>
          </View>
          <View style={styles.rowSignature}>
            <Text style={[styles.regularText, styles.minWidth]}>Vagao:</Text>
            <Text style={[styles.regularText, styles.minWidth]}>Vozac:</Text>
          </View>
        </View>
        {props.image ? (
          <Image
            style={{ alignSelf: 'center', width: 400, height: 200 }}
            source={props.image}
          />
        ) : null}
      </View>
    </Page>
  </Document>
);

export default PrvoVaganjePDF;
