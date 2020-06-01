import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Modal, makeStyles } from '@material-ui/core';
import Routes from './routes';
import Header from './components/Header';
import setup from './db/createDatabase';
import ContextProvider from './context/ContextProvider';
import createMainContextValue from './context/createMainContextValue';
import mainReducer, { State } from './context/reducer';
import SetupModal from './components/SetupModal';

const initialState: State = {
  companyName: ''
};

export default function RouterComponent() {
  const [showSetupModal, setShowSetupModal] = React.useState(false);
  const [state, dispatch] = React.useReducer(mainReducer, initialState);
  const mainContext = React.useMemo(
    () => createMainContextValue(state, dispatch),
    []
  );

  React.useEffect(() => {
    setup(setShowSetupModal);
  }, []);
  return (
    <ContextProvider value={mainContext}>
      <>
        <SetupModal showSetupModal={showSetupModal} />
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
      </>
    </ContextProvider>
  );
}
