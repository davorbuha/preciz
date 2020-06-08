/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable promise/always-return */
import React from 'react';
import storage from 'electron-json-storage';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MjestoIsporukeScreen, {
  fields
} from '../../screens/MaticniPodaci/MjestoIsporukeScreen';
import dbnames from '../../db/dbnames';
import MjestoIsporuke from '../../types/MjestoIsporuke';

function MjestoIsporukeContainer() {
  const [mjesta, setMjesta] = React.useState<MjestoIsporuke[]>([]);
  const [editId, setEditId] = React.useState<number | undefined>();
  const { handleSubmit, errors, control, setValue } = useForm({
    mode: 'onChange'
  });
  React.useEffect(() => {
    new Promise((resolve, reject) =>
      storage.get(dbnames.mjesta, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    )
      .then(res => {
        if (Array.isArray(res)) {
          const vRes = (res as Array<any>).map(MjestoIsporuke.fromJSON);
          setMjesta(vRes);
        }
      })
      .catch(e => {});
  }, []);
  const addMjestoIsporuke = (m: any) => {
    setValue(fields.naziv, '');
    const mjestoIsporuke = new MjestoIsporuke(uuidv4(), m[fields.naziv]);
    const mjestaToSet = [...mjesta, mjestoIsporuke];
    storage.set(dbnames.vozila, mjestaToSet, err =>
      console.log('vozila error', err)
    );
    setMjesta(mjestaToSet);
  };
  const onEditPress = (m: MjestoIsporuke, i: number) => {
    setEditId(i);
    setValue(fields.naziv, m.naziv);
  };
  const editMjestoIsporuke = () => {
    handleSubmit(m => {
      const mjestoIsporuke = new MjestoIsporuke(
        mjesta[editId!].id,
        m[fields.naziv]
      );
      const mjestaToSet = [...mjesta];
      mjestaToSet[editId!] = mjestoIsporuke;
      storage.set(dbnames.mjesta, mjestaToSet, err =>
        console.log('mjesta error', err)
      );
      setValue(fields.naziv, '');
      setMjesta(mjestaToSet);
    })();
  };
  const odbaciUredivanje = () => {
    setValue(fields.naziv, '');
    setEditId(undefined);
  };
  const deleteMjestoIsporuke = (i: number) => {
    const mjestaToSet = mjesta.filter((item, index) => {
      if (i === index) return false;
      return true;
    });
    storage.set(dbnames.mjesta, mjestaToSet, err =>
      console.log('mjesta error', err)
    );
    setMjesta(mjestaToSet);
  };
  return (
    <MjestoIsporukeScreen
      odbaciUredivanje={odbaciUredivanje}
      editId={editId}
      onEditPress={onEditPress}
      deleteMjestoIsporuke={deleteMjestoIsporuke}
      editMjestoIsporuke={editMjestoIsporuke}
      addMjestoIsporuke={handleSubmit(addMjestoIsporuke)}
      control={control}
      errors={errors}
      mjesta={mjesta}
    />
  );
}

export default MjestoIsporukeContainer;
