import { start } from 'repl';

/* eslint-disable lines-between-class-members */
class Postavke {
  communicationPort: string;
  baudRate: number;
  startPostion: number;
  endPosition: number;
  delimiter: boolean;

  constructor(
    communicationPort: string,
    baudRate: number,
    startPosition: number,
    endPostion: number,
    delimiter: boolean
  ) {
    this.communicationPort = communicationPort;
    this.baudRate = baudRate;
    this.startPostion = startPosition;
    this.endPosition = endPostion;
    this.delimiter = delimiter;
  }

  public static fromJSON(maybe: any) {
    return new Postavke(
      maybe.communication_port,
      maybe.baud_rate,
      maybe.start_position,
      maybe.end_position,
      maybe.delimiter ? true : false
    );
  }

  public toJSON() {
    return {
      communication_port: this.communicationPort,
      baud_rate: this.baudRate,
      start_position: this.startPostion,
      end_position: this.endPosition,
      delimiter: this.delimiter
    };
  }
}

export default Postavke;
