import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header';
import setup from './db/createDatabase';
import ContextProvider from './context/ContextProvider';
import createMainContextValue from './context/createMainContextValue';
import mainReducer, { State } from './context/reducer';
import SetupModal from './components/SetupModal';
import font from './assets/fonts/Poppins-Regular.ttf';
import fontBold from './assets/fonts/Poppins-Bold.ttf';
import { Font } from '@react-pdf/renderer';
import PasswordModal from './components/PasswordModal';

Font.register({
  family: 'Poppins-Regular',
  fonts: [
    {
      src: font
    }
  ]
});
Font.register({
  family: 'Poppins-Bold',
  fonts: [
    {
      src: font,
      fontWeight: 600
    }
  ]
});

const initialState: State = {
  company: {} as any,
  settings: {} as any
};

export default function RouterComponent() {
  const [passwordModal, setPasswordModal] = React.useState(false);
  const [showSetupModal, setShowSetupModal] = React.useState(false);
  const [state, dispatch] = React.useReducer(mainReducer, initialState);
  const mainContext = React.useMemo(
    () =>
      createMainContextValue(state, dispatch, (v: boolean) =>
        setShowSetupModal(v)
      ),
    [state]
  );

  React.useEffect(() => {
    setup(setShowSetupModal, mainContext.setCompany);
  }, []);
  return (
    <ContextProvider value={mainContext}>
      <>
        <HashRouter>
          <SetupModal
            setShowSetupModal={setShowSetupModal}
            showSetupModal={showSetupModal}
          />
          <PasswordModal
            setPasswordModal={setPasswordModal}
            passwordModal={passwordModal}
          />
          <Header showPasswordModal={() => setPasswordModal(true)} />
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
