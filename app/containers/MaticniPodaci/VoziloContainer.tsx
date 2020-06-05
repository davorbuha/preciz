/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable promise/always-return */
import React from 'react';
import storage from 'electron-json-storage';
import { useForm } from 'react-hook-form';
import VoziloScreen, { fields } from '../../screens/MaticniPodaci/VoziloScreen';
import dbnames from '../../db/dbnames';
import Vozilo from '../../types/Vozilo';

function VoziloContainer() {
  const [vozila, setVozila] = React.useState<Vozilo[]>([]);
  const [editId, setEditId] = React.useState<number | undefined>();
  const { handleSubmit, errors, control, setValue } = useForm({
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
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addVozilo = (v: any) => {
    setValue(fields.registracija, '');
    setValue(fields.tipVozila, '');
    setValue(fields.tezina, '');
    const vozilo = new Vozilo(
      v[fields.registracija],
      v[fields.tipVozila],
      v[fields.tezina]
    );
    const vozilaToSet = [...vozila, vozilo];
    storage.set(dbnames.vozila, vozilaToSet, err =>
      console.log('vozila error', err)
    );
    setVozila(vozilaToSet);
  };
  const onEditPress = (v: Vozilo, i: number) => {
    setEditId(i);
    setValue(fields.registracija, v.registracija);
    setValue(fields.tezina, v.tezina);
    setValue(fields.tipVozila, v.tipVozila);
  };
  const editVozilo = () => {
    handleSubmit(v => {
      const vozilo = new Vozilo(
        v[fields.registracija],
        v[fields.tipVozila],
        v[fields.tezina]
      );
      const vozilaToSet = [...vozila];
      vozilaToSet[editId!] = vozilo;
      storage.set(dbnames.vozila, vozilaToSet, err =>
        console.log('vozila error', err)
      );
      setValue(fields.registracija, '');
      setValue(fields.tezina, '');
      setValue(fields.tipVozila, '');
      setVozila(vozilaToSet);
    })();
  };
  const odbaciUredivanje = () => {
    setValue(fields.registracija, '');
    setValue(fields.tezina, '');
    setValue(fields.tipVozila, '');
    setEditId(undefined);
  };
  const deleteVozilo = (i: number) => {
    const vozilaToSet = vozila.filter((item, index) => {
      if (i === index) return false;
      return true;
    });
    storage.set(dbnames.vozila, vozilaToSet, err =>
      console.log('vozila error', err)
    );
    setVozila(vozilaToSet);
  };
  return (
    <VoziloScreen
      odbaciUredivanje={odbaciUredivanje}
      editId={editId}
      onEditPress={onEditPress}
      deleteVozilo={deleteVozilo}
      editVozilo={editVozilo}
      addVozilo={handleSubmit(addVozilo)}
      control={control}
      errors={errors}
      vozila={vozila}
    />
  );
}

export default VoziloContainer;
