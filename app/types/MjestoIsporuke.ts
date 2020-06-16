/* eslint-disable lines-between-class-members */
class MjestoIsporuke {
  id: string;
  naziv: string;

  constructor(id: string, naziv: string) {
    this.id = id;
    this.naziv = naziv;
  }

  public static fromJSON(maybe: any): MjestoIsporuke {
    if (!(maybe.naziv.length > 0 && maybe.naziv.length < 100)) {
      throw new Error('naziv not valid');
    }
    return new MjestoIsporuke(maybe.id, maybe.naziv);
  }

  public toJSON() {
    return {
      id: this.id,
      naziv: this.naziv
    };
  }
}

export default MjestoIsporuke;
