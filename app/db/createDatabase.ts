/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-template */
import storage from 'electron-json-storage';
import dbnames from './dbnames';
import CompanyDetails from '../types/CompanyDetails';

function setup(
  setSetupModal: (val: boolean) => void,
  setToContext: (comp: CompanyDetails) => void
) {
  // storage.remove(dbnames.setup, () => {});
  storage.get(dbnames.setup, (error, data: any) => {
    try {
      const companyDetails = CompanyDetails.fromJSON(data);
      if (!companyDetails.companyName) {
        setSetupModal(true);
      } else {
        setToContext(companyDetails);
      }
    } catch (e) {
      setSetupModal(true);
    }
  });
}

export default setup;
