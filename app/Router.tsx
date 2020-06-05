import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
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
        <SetupModal
          setShowSetupModal={setShowSetupModal}
          showSetupModal={showSetupModal}
        />
        <HashRouter>
          <Header />
          <div>
            {Routes.map(item => {
              return (
                <Route
                  exact={item.path === '/'}
                  path={item.path}
                  key={item.path}
                  component={item.component}
                />
              );
            })}
          </div>
        </HashRouter>
      </>
    </ContextProvider>
  );
}
