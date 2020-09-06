/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CompanyDetails from '../types/CompanyDetails';

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
  }
});

interface Props {
  company: CompanyDetails;
}

const ZbirniIzvještajPDF = (props: Props) => (
  <Document>
    <Page size="A4" orientation="landscape">
      <View style={styles.zaglavlje}>
        <Text style={styles.text}>{props.company.companyName}</Text>
        <Text style={styles.text}>{props.company.address}</Text>
        <Text style={styles.text}>Telefon: {props.company.phone}</Text>
        <Text style={styles.text}>Email: {props.company.mail}</Text>
      </View>
    </Page>
  </Document>
);

export default ZbirniIzvještajPDF;
