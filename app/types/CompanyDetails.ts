//Ime tvrtke, adresa, oib, telefon, mail

class CompanyDetails {
  constructor(
    public companyName: string,
    public address: string,
    public oib: number,
    public phone: string,
    public mail: string
  ) {}

  public toJSON() {
    return {
      company_name: this.companyName,
      address: this.address,
      oib: this.oib,
      phone: this.phone,
      mail: this.mail
    };
  }

  public static fromJSON(maybe: any) {
    if (typeof maybe !== 'object') {
      throw new Error('Company details is not object');
    }
    if (maybe.company_name.length > 100) {
      throw new Error('Company name is too long');
    }
    if (maybe.address.length > 100) {
      throw new Error('Company address is too long');
    }
    if (maybe.oib.length !== 11) {
      throw new Error('Company oib length is not equal to 11');
    }
    if (maybe.phone.length > 20) {
      throw new Error('Company phone is too long');
    }
    if (maybe.mail.length > 100) {
      throw new Error('Company mail is too long');
    }
    return new CompanyDetails(
      maybe.company_name,
      maybe.address,
      maybe.oib,
      maybe.phone,
      maybe.mail
    );
  }
}

export default CompanyDetails;
