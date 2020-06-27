/* eslint-disable lines-between-class-members */
import moment, { Moment } from 'moment';

class DrugoVaganje {
  id: string;
  bruto: number;
  neto: number;
  tara: number;
  ts: Moment;

  constructor(
    id: string,
    bruto: number,
    neto: number,
    tara: number,
    ts: Moment
  ) {
    this.id = id;
    this.bruto = bruto;
    this.neto = neto;
    this.tara = tara;
    this.ts = ts;
  }

  public static fromJSON(maybe: any): DrugoVaganje {
    return new DrugoVaganje(
      maybe.id,
      maybe.bruto,
      maybe.neto,
      maybe.tara,
      moment(maybe.ts)
    );
  }

  public toJSON() {
    return {
      id: this.id,
      bruto: this.bruto,
      neto: this.neto,
      tara: this.tara,
      ts: this.ts.toISOString()
    };
  }
}

export default DrugoVaganje;
