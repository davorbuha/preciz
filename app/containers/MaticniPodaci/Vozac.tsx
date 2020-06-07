import React from 'react';
import VozacScreen, { fields } from '../../screens/MaticniPodaci/VozacScreen';
import Vozac from '../../types/Vozac';
import { useForm } from 'react-hook-form';
import dbnames from '../../db/dbnames';
import storage from 'electron-json-storage';

function VozacContainer() {
  const [vozaci, setVozaci] = React.useState<Vozac[]>([]);
  const [editId, setEditId] = React.useState<number | undefined>();
  const { handleSubmit, errors, control, setValue } = useForm({
    mode: 'onChange'
  });
  React.useEffect(() => {
    new Promise((resolve, reject) =>
      storage.get(dbnames.vozaci, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    )
      .then(res => {
        const vRes = (res as Array<any>).map(Vozac.fromJSON);
        setVozaci(vRes);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addVozac = (v: any) => {
    setValue(fields.ime, '');
    setValue(fields.prezime, '');
    setValue(fields.oib, '');
    const vozac = new Vozac(v[fields.ime], v[fields.prezime], v[fields.oib]);
    const vozaciToSet = [...vozaci, vozac];
    storage.set(dbnames.vozaci, vozaciToSet, err =>
      console.log('vozaci error', err)
    );
    setVozaci(vozaciToSet);
  };
  const onEditPress = (z: Vozac, i: number) => {
    setEditId(i);
    setValue(fields.ime, z.ime);
    setValue(fields.prezime, z.prezime);
    setValue(fields.oib, z.oib);
  };
  const editVozac = () => {
    handleSubmit(z => {
      const vozac = new Vozac(z[fields.ime], z[fields.prezime], z[fields.oib]);
      const vozaciToSet = [...vozaci];
      vozaciToSet[editId!] = vozac;
      storage.set(dbnames.vozaci, vozaciToSet, err =>
        console.log('vozaci error', err)
      );
      setValue(fields.ime, '');
      setValue(fields.prezime, '');
      setValue(fields.oib, '');
      setVozaci(vozaciToSet);
    })();
  };
  const odbaciUredivanje = () => {
    setValue(fields.ime, '');
    setValue(fields.prezime, '');
    setValue(fields.oib, '');
    setEditId(undefined);
  };
  const deleteVozac = (i: number) => {
    const vozaciToSet = vozaci.filter((item, index) => {
      if (i === index) return false;
      return true;
    });
    storage.set(dbnames.vozaci, vozaciToSet, err =>
      console.log('vozila error', err)
    );
    setVozaci(vozaciToSet);
  };
  return (
    <VozacScreen
      odbaciUredivanje={odbaciUredivanje}
      editId={editId}
      onEditPress={onEditPress}
      deleteVozac={deleteVozac}
      editVozac={editVozac}
      addVozac={handleSubmit(addVozac)}
      control={control}
      errors={errors}
      vozaci={vozaci}
    />
  );
}

export default VozacContainer;
