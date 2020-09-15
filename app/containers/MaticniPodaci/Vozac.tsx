/* eslint-disable promise/always-return */
import React from 'react';
import { useForm } from 'react-hook-form';
import storage from 'electron-json-storage';
import { v4 as uuidv4 } from 'uuid';
import VozacScreen, { fields } from '../../screens/MaticniPodaci/VozacScreen';
import Vozac from '../../types/Vozac';
import dbnames from '../../db/dbnames';
import ErrorDialog from '../../components/ErrorDialog';

function VozacContainer() {
  const [errorText, setErrorText] = React.useState<string>();
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
        if (Array.isArray(res)) {
          const vRes = (res as Array<any>).map(Vozac.fromJSON);
          setVozaci(vRes);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addVozac = (v: any) => {
    // if (
    //   vozaci.find(voz => v[fields.oib].toLowerCase() === voz.oib.toLowerCase())
    // ) {
    //   setErrorText('Uneseni OIB već postoji u bazi');
    //   return;
    // }
    setValue(fields.ime, '');
    setValue(fields.prezime, '');
    setValue(fields.oib, '');
    const vozac = new Vozac(
      uuidv4(),
      v[fields.ime],
      v[fields.prezime],
      v[fields.oib]
    );
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
      // if (
      //   z[fields.oib].toLowerCase() !== vozaci[editId!].oib.toLowerCase() &&
      //   vozaci.find(
      //     voz => voz.oib.toLowerCase() === z[fields.oib].toLowerCase()
      //   )
      // ) {
      //   setErrorText('Uneseni OIB već postoji u bazi');
      //   return;
      // }
      const vozac = new Vozac(
        vozaci[editId!].id,
        z[fields.ime],
        z[fields.prezime],
        z[fields.oib]
      );
      const vozaciToSet = [...vozaci];
      vozaciToSet[editId!] = vozac;
      storage.set(dbnames.vozaci, vozaciToSet, err =>
        console.log('vozaci error', err)
      );
      setValue(fields.ime, '');
      setValue(fields.prezime, '');
      setValue(fields.oib, '');
      setEditId(undefined);
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
    <>
      <ErrorDialog
        errorText={errorText}
        handleClose={() => setErrorText(undefined)}
      />
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
    </>
  );
}

export default VozacContainer;
