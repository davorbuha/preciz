/* eslint-disable lines-between-class-members */
class Roba {
  naziv: string;
  sifraRobe: string;
  jedinicaMjere: string;

  constructor(naziv: string, sifraRobe: string, jedinicaMjere: string) {
    this.naziv = naziv;
    this.sifraRobe = sifraRobe;
    this.jedinicaMjere = jedinicaMjere;
  }

  public static fromJSON(maybe: any): Roba {
    if (!(maybe.naziv.length > 0 && maybe.naziv.length < 100)) {
      throw new Error('naziv not valid');
    }
    if (!(maybe.sifra_robe.length > 0 && maybe.sifra_robe.length < 100)) {
      throw new Error('sifraRobe not valid');
    }
    if (
      !(maybe.jedinica_mjere.length > 0 && maybe.jedinica_mjere.length < 100)
    ) {
      throw new Error('sifraRobe not valid');
    }
    return new Roba(maybe.naziv, maybe.sifra_robe, maybe.jedinica_mjere);
  }

  public toJSON() {
    return {
      naziv: this.naziv,
      sifra_robe: this.sifraRobe,
      jedinica_mjere: this.jedinicaMjere
    };
  }
}

export default Roba;
