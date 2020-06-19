import { start } from 'repl';

/* eslint-disable lines-between-class-members */
class Postavke {
  communicationPort: string;
  baudRate: number;
  startPostion: number;
  endPosition: number;

  constructor(
    communicationPort: string,
    baudRate: number,
    startPosition: number,
    endPostion: number
  ) {
    this.communicationPort = communicationPort;
    this.baudRate = baudRate;
    this.startPostion = startPosition;
    this.endPosition = endPostion;
  }

  public static fromJSON(maybe: any) {
    return new Postavke(
      maybe.communication_port,
      maybe.baud_rate,
      maybe.start_position,
      maybe.end_position
    );
  }

  public toJSON() {
    return {
      communication_port: this.communicationPort,
      baud_rate: this.baudRate,
      start_position: this.startPostion,
      end_position: this.endPosition
    };
  }
}

export default Postavke;
