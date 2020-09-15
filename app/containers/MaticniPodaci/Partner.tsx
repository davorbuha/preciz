/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable promise/always-return */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import storage from 'electron-json-storage';
import { useForm } from 'react-hook-form';
import PartnerScreen, {
  fields
} from '../../screens/MaticniPodaci/PartnerScreen';
import dbnames from '../../db/dbnames';
import Partner from '../../types/Partner';
import ErrorDialog from '../../components/ErrorDialog';

function PartnerContainer() {
  const [errorText, setErrorText] = React.useState<string>();
  const [partneri, setPartneri] = React.useState<Partner[]>([]);
  const [editId, setEditId] = React.useState<number | undefined>();
  const { handleSubmit, errors, control, setValue } = useForm({
    mode: 'onChange'
  });

  React.useEffect(() => {
    new Promise((resolve, reject) =>
      storage.get(dbnames.partneri, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    )
      .then(res => {
        if (Array.isArray(res)) {
          const vRes = (res as Array<any>).map(Partner.fromJSON);
          setPartneri(vRes);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const addPartner = (p: any) => {
    if (
      partneri.find(
        par => p[fields.sifra].toLowerCase() === par.sifra.toLowerCase()
      )
    ) {
      setErrorText('Unesena šifra partnera već postoji u bazi');
      return;
    }
    setValue(fields.naziv, '');
    setValue(fields.sifra, '');
    setValue(fields.ulica, '');
    setValue(fields.grad, '');
    setValue(fields.telefon, '');
    setValue(fields.fax, '');
    setValue(fields.email, '');
    setValue(fields.napomena, '');

    const partner = new Partner(
      uuidv4(),
      p[fields.sifra],
      p[fields.naziv],
      p[fields.ulica],
      p[fields.grad],
      p[fields.telefon],
      p[fields.fax],
      p[fields.email],
      p[fields.napomena]
    );
    const partneriToSet = [...partneri, partner];
    storage.set(dbnames.partneri, partneriToSet, err =>
      console.log('partneri error', err)
    );
    setPartneri(partneriToSet);
  };
  const onEditPress = (p: Partner, i: number) => {
    setEditId(i);
    setValue(fields.naziv, p.naziv);
    setValue(fields.sifra, p.sifra);
    setValue(fields.ulica, p.ulica);
    setValue(fields.grad, p.grad);
    setValue(fields.telefon, p.telefon);
    setValue(fields.fax, p.fax);
    setValue(fields.email, p.email);
    setValue(fields.napomena, p.napomena);
  };
  const editPartner = () => {
    handleSubmit(p => {
      const partner = new Partner(
        uuidv4(),
        p[fields.sifra],
        p[fields.naziv],
        p[fields.ulica],
        p[fields.grad],
        p[fields.telefon],
        p[fields.fax],
        p[fields.email],
        p[fields.napomena]
      );
      const partneriToSet = [...partneri];
      partneriToSet[editId!] = partner;
      storage.set(dbnames.partneri, partneriToSet, err =>
        console.log('partneri error', err)
      );
      setValue(fields.naziv, '');
      setValue(fields.sifra, '');
      setValue(fields.ulica, '');
      setValue(fields.grad, '');
      setValue(fields.telefon, '');
      setValue(fields.fax, '');
      setValue(fields.email, '');
      setValue(fields.napomena, '');
      setPartneri(partneriToSet);
      setEditId(undefined);
    })();
  };
  const odbaciUredivanje = () => {
    setValue(fields.naziv, '');
    setValue(fields.sifra, '');
    setValue(fields.ulica, '');
    setValue(fields.grad, '');
    setValue(fields.telefon, '');
    setValue(fields.fax, '');
    setValue(fields.email, '');
    setValue(fields.napomena, '');
    setEditId(undefined);
  };
  const deletePartner = (i: number) => {
    const partneriToSet = partneri.filter((item, index) => {
      if (i === index) return false;
      return true;
    });
    storage.set(dbnames.partneri, partneriToSet, err =>
      console.log('partneri error', err)
    );
    setPartneri(partneriToSet);
  };
  return (
    <>
      <ErrorDialog
        errorText={errorText}
        handleClose={() => setErrorText(undefined)}
      />
      <PartnerScreen
        odbaciUredivanje={odbaciUredivanje}
        editId={editId}
        onEditPress={onEditPress}
        deletePartner={deletePartner}
        editPartner={editPartner}
        addPartner={handleSubmit(addPartner)}
        control={control}
        errors={errors}
        partneri={partneri}
      />
    </>
  );
}

export default PartnerContainer;
