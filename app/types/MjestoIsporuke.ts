/* eslint-disable lines-between-class-members */
class MjestoIsporuke {
  naziv: string;

  constructor(naziv: string) {
    this.naziv = naziv;
  }

  public static fromJSON(maybe: any): MjestoIsporuke {
    if (!(maybe.naziv.length > 0 && maybe.naziv.length < 100)) {
      throw new Error('naziv not valid');
    }
    return new MjestoIsporuke(maybe.naziv);
  }

  public toJSON() {
    return {
      naziv: this.naziv
    };
  }
}

export default MjestoIsporuke;
