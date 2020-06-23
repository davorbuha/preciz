/* eslint-disable lines-between-class-members */
class Prikolica {
  id: string;
  registracijaPrikolice: string;
  tipPrikolice: string;
  tezinaPrikolice: string;

  constructor(
    id: string,
    registracijaPrikolice: string,
    tipPrikolice: string,
    tezinaPrikolice: string
  ) {
    this.id = id;
    this.registracijaPrikolice = registracijaPrikolice;
    this.tipPrikolice = tipPrikolice;
    this.tezinaPrikolice = tezinaPrikolice;
  }

  public static fromJSON(maybe: any): Prikolica {
    if (
      !(
        maybe.registracija_prikolice.length > 0 &&
        maybe.registracija_prikolice.length < 100
      )
    ) {
      throw new Error('registracija not valid');
    }
    if (!(maybe.tip_prikolice.length > 0 && maybe.tip_prikolice.length < 100)) {
      throw new Error('tipPrikolice not valid');
    }
    return new Prikolica(
      maybe.id,
      maybe.registracija_prikolice,
      maybe.tip_prikolice,
      maybe.tezina_prikolice
    );
  }

  public toJSON() {
    return {
      id: this.id,
      registracija_prikolice: this.registracijaPrikolice,
      tip_prikolice: this.tipPrikolice,
      tezina_prikolice: this.tezinaPrikolice
    };
  }
}
export default Prikolica;
