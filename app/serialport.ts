// import SerialPort from 'serialport';
// const Readline = require('@serialport/parser-readline');

// SerialPort.list().then(res => {
//   const port = new SerialPort(res[4].path, { baudRate: 9600 });
//   const parser = new Readline();
//   port.pipe(parser);
//   parser.on('data', (line: string) => {
//     console.log(line.split(',')[2]);
//   });
// });
