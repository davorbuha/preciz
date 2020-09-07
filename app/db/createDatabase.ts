/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-template */
import storage from 'electron-json-storage';
import dbnames from './dbnames';
import CompanyDetails from '../types/CompanyDetails';
import Brojac from '../types/Brojac';

function setup(
  setSetupModal: (val: boolean) => void,
  setToContext: (comp: CompanyDetails) => void
) {
  storage.get(dbnames.brojac, (err, data) => {
    const brojac = Brojac.fromJSON(data);
    if (!brojac.value) {
      console.log(brojac.value);
      storage.set(dbnames.brojac, new Brojac(0).toJSON(), () => {});
    }
  });
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
