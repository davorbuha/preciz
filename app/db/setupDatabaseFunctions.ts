import storage from 'electron-json-storage';
import dbnames from './dbnames';
import CompanyDetails from '../types/CompanyDetails';

function setToSetupDB(cd: CompanyDetails, cb: () => void) {
  storage.set(dbnames.setup, cd, cb);
}

export default setToSetupDB;
