import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import SerialPort from 'serialport';
const Readline = require('@serialport/parser-readline')

export default function Routes() {
  SerialPort.list().then((res) => {console.log('ovdjeeeeeee', res);
  const port = new SerialPort(res[0].path, { baudRate: 9600 })
  const parser = new Readline()
  port.pipe(parser)
  parser.on('data', line => console.log(`> ${line}`))
  });
  
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
