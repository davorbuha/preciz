/* eslint-disable lines-between-class-members */
import moment, { Moment } from 'moment';

class PrvoVaganje {
  id: string;
  tip: string;
  registracija: string;
  prikolica: string;
  vozac: string;
  dobavljac: string;
  roba: string;
  mjestoIsporuke: string;
  brojNaloga: string;
  bruto: number;
  ts: Moment;
  drugoVaganjeId?: string;
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
    ts: Moment,
    drugoVaganjeId?: string
  ) {
    this.id = id;
    this.tip = tip;
    this.registracija = registracija;
    this.prikolica = prikolica;
    this.vozac = vozac;
    this.dobavljac = dobavljac;
    this.roba = roba;
    this.mjestoIsporuke = mjestoIsporuke;
    this.brojNaloga = brojNaloga;
    this.bruto = bruto;
    this.ts = ts;
    this.drugoVaganjeId = drugoVaganjeId;
  }

  public static fromJSON(maybe: any) {
    return new PrvoVaganje(
      maybe.id,
      maybe.tip,
      maybe.registracija,
      maybe.prikolica,
      maybe.vozac,
      maybe.dobavljac,
      maybe.roba,
      maybe.mjesto_isporuke,
      maybe.broj_naloga,
      maybe.bruto,
      moment(maybe.ts),
      maybe.drugo_vaganje_id
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
      mjesto_isporuke: this.mjestoIsporuke,
      broj_naloga: this.brojNaloga,
      bruto: this.bruto,
      ts: this.ts.toISOString(),
      drugo_vaganje_id: this.drugoVaganjeId
    };
  }
}

export default PrvoVaganje;
