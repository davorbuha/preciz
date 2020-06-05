/* eslint-disable lines-between-class-members */
class Vozilo {
  registracija: string;
  tipVozila: string;
  tezina: number;

  constructor(registracija: string, tipVozila: string, tezina: number) {
    this.registracija = registracija;
    this.tipVozila = tipVozila;
    this.tezina = tezina;
  }

  public static fromJSON(maybe: any): Vozilo {
    if (!(maybe.registracija.length > 0 && maybe.registracija.length < 100)) {
      throw new Error('registracija not valid');
    }
    if (!(maybe.tip_vozila.length > 0 && maybe.tip_vozila.length < 100)) {
      throw new Error('tipVozila not valid');
    }

    if (typeof maybe.tezina !== 'number') {
      throw new Error('tezina not valid');
    }
    return new Vozilo(maybe.registracija, maybe.tip_vozila, maybe.tezina);
  }

  public toJSON() {
    return {
      registracija: this.registracija,
      tip_vozila: this.tipVozila,
      tezina: this.tezina
    };
  }
}

export default Vozilo;
