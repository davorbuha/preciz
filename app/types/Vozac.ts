/* eslint-disable lines-between-class-members */
class Vozac {
  ime: string;
  prezime: string;
  oib: string;

  constructor(ime: string, prezime: string, oib: string) {
    this.ime = ime;
    this.prezime = prezime;
    this.oib = oib;
  }

  public static fromJSON(maybe: any): Vozac {
    if (!(maybe.ime.length > 0 && maybe.ime.length < 100)) {
      throw new Error('ime not valid');
    }
    if (!(maybe.prezime.length > 0 && maybe.prezime.length < 100)) {
      throw new Error('prezime not valid');
    }
    if (!(maybe.oib.length > 0 && maybe.oib.length < 11)) {
      throw new Error('oib not valid');
    }
    return new Vozac(maybe.ime, maybe.prezime, maybe.oib);
  }

  public toJSON() {
    return {
      ime: this.ime,
      prezime: this.prezime,
      oib: this.oib
    };
  }
}

export default Vozac;
