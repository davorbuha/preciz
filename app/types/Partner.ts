/* eslint-disable lines-between-class-members */
class Partner {
  id: string;
  sifra: string;
  naziv: string;
  ulica: string;
  grad: string;
  telefon: string;
  fax: string;
  email: string;
  napomena: string;

  constructor(
    id: string,
    sifra: string,
    naziv: string,
    ulica: string,
    grad: string,
    telefon: string,
    fax: string,
    email: string,
    napomena: string
  ) {
    this.id = id;
    this.sifra = sifra;
    this.naziv = naziv;
    this.ulica = ulica;
    this.grad = grad;
    this.telefon = telefon;
    this.email = email;
    this.napomena = napomena;
    this.fax = fax;
  }

  public static fromJSON(maybe: any): Partner {
    if (!(maybe.naziv.length > 0 && maybe.naziv.length < 100)) {
      throw new Error('naziv not valid');
    }
    if (!(maybe.ulica.length > 0 && maybe.ulica.length < 100)) {
      throw new Error('ulica not valid');
    }
    if (!(maybe.grad.length > 0 && maybe.grad.length < 100)) {
      throw new Error('grad not valid');
    }
    if (!(maybe.telefon.length > 0 && maybe.telefon.length < 20)) {
      throw new Error('telefon not valid');
    }
    if (!(maybe.email.length > 0 && maybe.email.length < 100)) {
      throw new Error('email not valid');
    }
    if (!(maybe.napomena.length > 0 && maybe.napomena.length < 100)) {
      throw new Error('napomena not valid');
    }
    // if (!(maybe.fax.length > 0 && maybe.fax.length < 100)) {
    //   throw new Error('fax not valid');
    // }
    return new Partner(
      maybe.id,
      maybe.sifra,
      maybe.naziv,
      maybe.ulica,
      maybe.grad,
      maybe.telefon,
      maybe.fax,
      maybe.email,
      maybe.napomena
    );
  }

  public toJSON() {
    return {
      id: this.id,
      sifra: this.sifra,
      naziv: this.naziv,
      ulica: this.ulica,
      grad: this.grad,
      telefon: this.telefon,
      email: this.email,
      napomena: this.napomena,
      fax: this.fax
    };
  }
}

export default Partner;
