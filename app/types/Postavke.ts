/* eslint-disable lines-between-class-members */
class Postavke {
  communicationPort: number;
  baudRate: number;

  constructor(communicationPort: number, baudRate: number) {
    this.communicationPort = communicationPort;
    this.baudRate = baudRate;
  }

  public static fromJSON(maybe: any) {
    return new Postavke(maybe.communication_port, maybe.baud_rate);
  }

  public toJSON() {
    return {
      communication_port: this.communicationPort,
      baud_rate: this.baudRate
    };
  }
}

export default Postavke;
