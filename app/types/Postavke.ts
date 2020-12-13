import { start } from 'repl';

/* eslint-disable lines-between-class-members */
class Postavke {
  communicationPort: string;
  baudRate: number;
  startPostion: number;
  endPosition: number;
  delimiter: boolean;
  cameraIp: string;
  cameraUsername: string;
  cameraPassword: string;
  cameraChannel: string;

  constructor(
    communicationPort: string,
    baudRate: number,
    cameraIp: string,
    cameraUsername: string,
    cameraPassword: string,
    cameraChannel: string,
    startPosition: number,
    endPostion: number,
    delimiter: boolean
  ) {
    this.cameraChannel = cameraChannel;
    this.cameraIp = cameraIp;
    this.cameraUsername = cameraUsername;
    this.cameraPassword = cameraPassword;
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
      maybe.camera_ip,
      maybe.camera_username,
      maybe.camera_password,
      maybe.camera_channel,
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
      delimiter: this.delimiter,
      camera_ip: this.cameraIp,
      camera_username: this.cameraUsername,
      camera_password: this.cameraPassword,
      camera_channel: this.cameraChannel
    };
  }
}

export default Postavke;
