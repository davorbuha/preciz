/* eslint-disable promise/always-return */
import React from 'react';
import storage from 'electron-json-storage';
import { useForm } from 'react-hook-form';
import VoziloScreen from '../../screens/MaticniPodaci/VoziloScreen';
import dbnames from '../../db/dbnames';
import Vozilo from '../../types/Vozilo';

function VoziloContainer() {
  const [vozila, setVozila] = React.useState<Vozilo[]>([]);
  const { handleSubmit, errors, control } = useForm({
    mode: 'onChange'
  });
  React.useEffect(() => {
    new Promise((resolve, reject) =>
      storage.get(dbnames.vozila, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    )
      .then(res => {
        const vRes = (res as Array<any>).map(Vozilo.fromJSON);
        setVozila(vRes);
      })
      .catch(() => {});
  }, []);
  return <VoziloScreen control={control} errors={errors} vozila={vozila} />;
}

export default VoziloContainer;
