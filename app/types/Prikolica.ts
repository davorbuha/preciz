class Prikolica {
  registracijaPrikolice: string;
  tipPrikolice: string;
  tezinaPrikolice: number;

  constructor(
    registracijaPrikolice: string,
    tipPrikolice: string,
    tezinaPrikolice: number
  ) {
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
      maybe.registracija_prikolice,
      maybe.tip_prikolice,
      maybe.tezina_prikolice
    );
  }

  public toJSON() {
    return {
      registracija: this.registracijaPrikolice,
      tip_vozila: this.tipPrikolice,
      tezina: this.tezinaPrikolice
    };
  }
}
export default Prikolica;
