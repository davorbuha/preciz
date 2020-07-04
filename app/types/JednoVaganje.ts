/* eslint-disable lines-between-class-members */
import moment, { Moment } from 'moment';

class JednoVaganje {
  id: string;
  tip: string;
  registracija: string;
  prikolica: string;
  vozac: string;
  dobavljac: string;
  roba: string;
  vlaga?: string;
  mjestoIsporuke: string;
  brojNaloga: string;
  bruto: number;
  neto: number;
  tara: number;
  ts: Moment;
  constructor(
    id: string,
    tip: string,
    registracija: string,
    prikolica: string,
    vozac: string,
    dobavljac: string,
    roba: string,
    mjestoIsporuke: string,
    brojNaloga: string,
    bruto: number,
    neto: number,
    tara: number,
    ts: Moment,
    vlaga?: string
  ) {
    this.id = id;
    this.tip = tip;
    this.registracija = registracija;
    this.prikolica = prikolica;
    this.vozac = vozac;
    this.dobavljac = dobavljac;
    this.roba = roba;
    this.vlaga = vlaga;
    this.mjestoIsporuke = mjestoIsporuke;
    this.brojNaloga = brojNaloga;
    this.bruto = bruto;
    this.neto = neto;
    this.tara = tara;
    this.ts = ts;
  }

  public static fromJSON(maybe: any) {
    return new JednoVaganje(
      maybe.id,
      maybe.tip,
      maybe.registracija,
      maybe.prikolica,
      maybe.vozac,
      maybe.dobavljac,
      maybe.roba,
      maybe.vlaga,
      maybe.mjesto_isporuke,
      maybe.broj_naloga,
      maybe.bruto,
      maybe.neto,
      maybe.tara,
      moment(maybe.ts)
    );
  }
  public toJSON() {
    return {
      id: this.id,
      tip: this.tip,
      registracija: this.registracija,
      prikolica: this.prikolica,
      vozac: this.vozac,
      dobavljac: this.dobavljac,
      roba: this.roba,
      vlaga: this.vlaga,
      mjesto_isporuke: this.mjestoIsporuke,
      broj_naloga: this.brojNaloga,
      bruto: this.bruto,
      neto: this.neto,
      tara: this.tara,
      ts: this.ts.toISOString()
    };
  }
}

export default JednoVaganje;
