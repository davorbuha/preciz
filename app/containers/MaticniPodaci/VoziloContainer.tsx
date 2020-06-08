/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable promise/always-return */
import React from 'react';
import storage from 'electron-json-storage';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import VoziloScreen, { fields } from '../../screens/MaticniPodaci/VoziloScreen';
import dbnames from '../../db/dbnames';
import Vozilo from '../../types/Vozilo';
import ErrorDialog from '../../components/ErrorDialog';

function VoziloContainer() {
  const [errorText, setErrorText] = React.useState<string>();
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
        if (Array.isArray(res)) {
          const vRes = (res as Array<any>).map(Vozilo.fromJSON);
          setVozila(vRes);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addVozilo = (v: any) => {
    if (
      vozila.find(
        voz =>
          v[fields.registracija].toLowerCase() ===
          voz.registracija.toLowerCase()
      )
    ) {
      setErrorText('Unesena registracija već postoji u bazi');
      return;
    }
    setValue(fields.registracija, '');
    setValue(fields.tipVozila, '');
    setValue(fields.tezina, '');
    const vozilo = new Vozilo(
      uuidv4(),
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
      if (
        v[fields.registracija].toLowerCase() !==
          vozila[editId!].registracija.toLowerCase() &&
        vozila.find(
          voz =>
            voz.registracija.toLowerCase() ===
            v[fields.registracija].toLowerCase()
        )
      ) {
        setErrorText('Unesena registracija već postoji u bazi');
        return;
      }
      const vozilo = new Vozilo(
        vozila[editId!].id,
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
      setEditId(undefined);
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
    <>
      <ErrorDialog
        errorText={errorText}
        handleClose={() => setErrorText(undefined)}
      />
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
    </>
  );
}

export default VoziloContainer;
