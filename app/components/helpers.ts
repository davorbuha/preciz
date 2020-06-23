/* eslint-disable no-shadow */
import storage from 'electron-json-storage';
import dbnames from '../db/dbnames';
import Vozilo from '../types/Vozilo';
import Prikolica from '../types/Prikolica';
import Vozac from '../types/Vozac';

export function getRegistracijaById(id: string): Promise<Vozilo> {
  return new Promise(resolve =>
    storage.get(dbnames.vozila, (err, data) => {
      resolve(
        (data as Array<any>).map(Vozilo.fromJSON).find(item => item.id === id)
      );
    })
  );
}

export function getPrikolicaRegistracijaById(id: string): Promise<Prikolica> {
  return new Promise(resolve =>
    storage.get(dbnames.prikolice, (err, data) =>
      resolve(
        (data as Array<any>)
          .map(Prikolica.fromJSON)
          .find(item => item.id === id)
      )
    )
  );
}

export function getVozacById(id: string): Promise<Vozac> {
  return new Promise(resolve =>
    storage.get(dbnames.vozaci, (err, data) =>
      resolve(
        (data as Array<any>).map(Vozac.fromJSON).find(item => item.id === id)
      )
    )
  );
}
