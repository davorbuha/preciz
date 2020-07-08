/* eslint-disable lines-between-class-members */
class Vozac {
  id: string;
  ime: string;
  prezime: string;
  oib: string;

  constructor(id: string, ime: string, prezime: string, oib: string) {
    this.id = id;
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
    return new Vozac(maybe.id, maybe.ime, maybe.prezime, maybe.oib);
  }

  public toJSON() {
    return {
      id: this.id,
      ime: this.ime,
      prezime: this.prezime,
      oib: this.oib
    };
  }
}

export default Vozac;
