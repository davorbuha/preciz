import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header';

export default function RouterComponent() {
  return (
    <BrowserRouter>
      <Header>
        <Switch>
          {Routes.map(item => (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
            />
          ))}
        </Switch>
      </Header>
    </BrowserRouter>
  );
}
