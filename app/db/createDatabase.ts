/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-template */
import storage from 'electron-json-storage';
import dbnames from './dbnames';

function setup(setSetupModal: (val: boolean) => void) {
  storage.get(dbnames.setup, (error, data: any) => {
    if (!data.companyName) {
      setSetupModal(true);
    }
  });
}

export default setup;
