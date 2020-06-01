import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header';

export default function RouterComponent() {
  return (
    <Header>
      <BrowserRouter>
        <Switch>
          {Routes.map(item => (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Header>
  );
}
