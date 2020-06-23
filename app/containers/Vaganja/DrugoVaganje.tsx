import React from 'react';
import storage from 'electron-json-storage';
import DrugoVaganjeScreen from '../../screens/Vaganja/DrugoVaganjeScreen';
import dbnames from '../../db/dbnames';
import PrvoVaganje from '../../types/PrvoVaganje';

function DrugoVaganjeContainer() {
  const [prvaVaganja, setPrvaVaganja] = React.useState<PrvoVaganje[]>([]);
  React.useEffect(() => {
    storage.get(dbnames.prvoVaganje, (err, data) => {
      console.log(data);
      if (Array.isArray(data)) {
        setPrvaVaganja(
          data
            .map(PrvoVaganje.fromJSON)
            .filter(item => item.drugoVaganjeId === undefined)
        );
      }
    });
  }, []);
  return <DrugoVaganjeScreen prvaVaganja={prvaVaganja} />;
}

export default DrugoVaganjeContainer;
