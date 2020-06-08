/* eslint-disable promise/always-return */
import React from 'react';
import storage from 'electron-json-storage';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import PrikolicaScreen, {
  fields
} from '../../screens/MaticniPodaci/PrikolicaScreen';
import Prikolica from '../../types/Prikolica';
import dbnames from '../../db/dbnames';
import ErrorDialog from '../../components/ErrorDialog';

function PrikolicaContainer() {
  const [errorText, setErrorText] = React.useState<string>();
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
        if (Array.isArray(res)) {
          const pRes = (res as Array<any>).map(Prikolica.fromJSON);
          setPrikolice(pRes);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addPrikolica = (p: any) => {
    if (
      prikolice.find(
        pri =>
          p[fields.registracijaPrikolice].toLowerCase() ===
          pri.registracijaPrikolice.toLowerCase()
      )
    ) {
      setErrorText('Unesena registracija već postoji u bazi');
      return;
    }
    setValue(fields.registracijaPrikolice, '');
    setValue(fields.tipPrikolice, '');
    setValue(fields.tezinaPrikolice, '');
    const prikolica = new Prikolica(
      uuidv4(),
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
      if (
        p[fields.registracijaPrikolice].toLowerCase() !==
          prikolice[editId!].registracijaPrikolice.toLowerCase() &&
        prikolice.find(
          pri =>
            pri.registracijaPrikolice.toLowerCase() ===
            p[fields.registracijaPrikolice].toLowerCase()
        )
      ) {
        setErrorText('Unesena registracija već postoji u bazi');
        return;
      }
      const prikolica = new Prikolica(
        prikolice[editId!].id,
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
      setEditId(undefined);
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
    <>
      <ErrorDialog
        errorText={errorText}
        handleClose={() => setErrorText(undefined)}
      />
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
    </>
  );
}
export default PrikolicaContainer;
