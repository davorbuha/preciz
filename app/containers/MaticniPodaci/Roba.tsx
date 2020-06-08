/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable promise/always-return */
import React from 'react';
import storage from 'electron-json-storage';
import { useForm } from 'react-hook-form';
import RobaScreen, { fields } from '../../screens/MaticniPodaci/RobaScreen';
import dbnames from '../../db/dbnames';
import Roba from '../../types/Roba';

function RobaContainer() {
  const [robe, setRobe] = React.useState<Roba[]>([]);
  const [editId, setEditId] = React.useState<number | undefined>();
  const { handleSubmit, errors, control, setValue } = useForm({
    mode: 'onChange'
  });
  React.useEffect(() => {
    new Promise((resolve, reject) =>
      storage.get(dbnames.roba, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    )
      .then(res => {
        const vRes = (res as Array<any>).map(Roba.fromJSON);
        setRobe(vRes);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addRoba = (r: any) => {
    setValue(fields.sifraRobe, '');
    setValue(fields.naziv, '');
    setValue(fields.jedinicaMjere, '');
    const roba = new Roba(
      r[fields.sifraRobe],
      r[fields.naziv],
      r[fields.jedinicaMjere]
    );
    const robeToSet = [...robe, roba];
    storage.set(dbnames.roba, robeToSet, err => console.log('roba error', err));
    setRobe(robeToSet);
  };
  const onEditPress = (r: Roba, i: number) => {
    setEditId(i);
    setValue(fields.sifraRobe, r.sifraRobe);
    setValue(fields.naziv, r.naziv);
    setValue(fields.jedinicaMjere, r.jedinicaMjere);
  };
  const editRoba = () => {
    handleSubmit(r => {
      const roba = new Roba(
        r[fields.sifraRobe],
        r[fields.naziv],
        r[fields.jedinicaMjere]
      );
      const robeToSet = [...robe];
      robeToSet[editId!] = roba;
      storage.set(dbnames.roba, robeToSet, err =>
        console.log('roba error', err)
      );
      setValue(fields.sifraRobe, '');
      setValue(fields.naziv, '');
      setValue(fields.jedinicaMjere, '');
      setRobe(robeToSet);
    })();
  };
  const odbaciUredivanje = () => {
    setValue(fields.sifraRobe, '');
    setValue(fields.naziv, '');
    setValue(fields.jedinicaMjere, '');
    setEditId(undefined);
  };
  const deleteRoba = (i: number) => {
    const robeToSet = robe.filter((item, index) => {
      if (i === index) return false;
      return true;
    });
    storage.set(dbnames.roba, robeToSet, err => console.log('roba error', err));
    setRobe(robeToSet);
  };
  return (
    <RobaScreen
      odbaciUredivanje={odbaciUredivanje}
      editId={editId}
      onEditPress={onEditPress}
      deleteRoba={deleteRoba}
      editRoba={editRoba}
      addRoba={handleSubmit(addRoba)}
      control={control}
      errors={errors}
      robe={robe}
    />
  );
}

export default RobaContainer;
