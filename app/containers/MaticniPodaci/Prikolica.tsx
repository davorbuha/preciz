import React from 'react';
import PrikolicaScreen, {
  fields
} from '../../screens/MaticniPodaci/PrikolicaScreen';
import Prikolica from '../../types/Prikolica';
import storage from 'electron-json-storage';
import dbnames from '../../db/dbnames';
import { useForm } from 'react-hook-form';

function PrikolicaContainer() {
  const [prikolice, setPrikolice] = React.useState<Prikolica[]>([]);
  const [editId, setEditId] = React.useState<number | undefined>();
  const { handleSubmit, errors, control, setValue } = useForm({
    mode: 'onChange'
  });
  React.useEffect(() => {
    new Promise((resolve, reject) =>
      storage.get(dbnames.prikolice, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    )
      .then(res => {
        const pRes = (res as Array<any>).map(Prikolica.fromJSON);
        setPrikolice(pRes);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addPrikolica = (p: any) => {
    setValue(fields.registracijaPrikolice, '');
    setValue(fields.tipPrikolice, '');
    setValue(fields.tezinaPrikolice, '');
    const prikolica = new Prikolica(
      p[fields.registracijaPrikolice],
      p[fields.tipPrikolice],
      p[fields.tezinaPrikolice]
    );
    const prikolicaToSet = [...prikolice, prikolica];
    storage.set(dbnames.prikolice, prikolicaToSet, err =>
      console.log('prikolica error', err)
    );
    setPrikolice(prikolicaToSet);
  };
  const onEditPress = (p: Prikolica, i: number) => {
    setEditId(i);
    setValue(fields.registracijaPrikolice, p.registracijaPrikolice);
    setValue(fields.tezinaPrikolice, p.tezinaPrikolice);
    setValue(fields.tipPrikolice, p.tipPrikolice);
  };

  const editPrikolica = () => {
    handleSubmit(p => {
      const prikolica = new Prikolica(
        p[fields.registracijaPrikolice],
        p[fields.tipPrikolice],
        p[fields.tezinaPrikolice]
      );
      const prikolicaToSet = [...prikolice];
      prikolicaToSet[editId!] = prikolica;
      storage.set(dbnames.prikolice, prikolicaToSet, err =>
        console.log('prikolica error', err)
      );
      setValue(fields.registracijaPrikolice, '');
      setValue(fields.tezinaPrikolice, '');
      setValue(fields.tipPrikolice, '');
      setPrikolice(prikolicaToSet);
    })();
  };
  const odbaciUredivanje = () => {
    setValue(fields.registracijaPrikolice, '');
    setValue(fields.tezinaPrikolice, '');
    setValue(fields.tipPrikolice, '');
    setEditId(undefined);
  };
  const deletePrikolica = (i: number) => {
    const prikolicaToSet = prikolice.filter((item, index) => {
      if (i === index) return false;
      return true;
    });
    storage.set(dbnames.prikolice, prikolicaToSet, err =>
      console.log('prikolice error', err)
    );
    setPrikolice(prikolicaToSet);
  };
  return (
    <PrikolicaScreen
      odbaciUredivanje={odbaciUredivanje}
      editId={editId}
      onEditPress={onEditPress}
      deletePrikolice={deletePrikolica}
      editPrikolica={editPrikolica}
      addPrikolica={handleSubmit(addPrikolica)}
      control={control}
      errors={errors}
      prikolice={prikolice}
    />
  );
}
export default PrikolicaContainer;
