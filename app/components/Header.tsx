import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import SelectMenu from './SelectMenu';
import { RoutesEnum } from '../routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}));

interface Props {
  children: JSX.Element;
}

const MaticniPodaciItems = [
  { path: RoutesEnum.MaticniPodaciVozilo, title: 'Vozilo' },
  { path: RoutesEnum.MaticniPodaciVozac, title: 'Vozač' },
  { path: RoutesEnum.MaticniPodaciPrikolica, title: 'Prikolica' },
  { path: RoutesEnum.MaticniPodaciRoba, title: 'Roba' },
  { path: RoutesEnum.MaticniPodaciPartner, title: 'Partner' },
  { path: RoutesEnum.MaticniPodaciMjestoIsporuke, title: 'Mjesto isporuke' }
];

const VaganjaItems = [
  { path: RoutesEnum.JednoVaganje, title: 'Jedno vaganje' },
  { path: RoutesEnum.PrvoVaganje, title: 'Prvo vaganje' },
  { path: RoutesEnum.DrugoVaganje, title: 'Drugo vaganje' },
  { path: RoutesEnum.UnosVaganja, title: 'Unos vaganja' }
];

const IzvjescaItems = [
  { path: RoutesEnum.PregledVaganja, title: 'Pregled vaganja' },
  { path: RoutesEnum.PregledZaRobu, title: 'Pregled za robu' },
  { path: RoutesEnum.PregledZaKupca, title: 'Pregled za kupca - dobavljača' }
];

const BazaItems = [
  { path: RoutesEnum.ArhiviranjeBaze, title: 'Arhiviranje baze' },
  { path: RoutesEnum.PovratakBaze, title: 'Povratak arhive' },
  { path: RoutesEnum.BrisanjePodataka, title: 'Brisanje podataka' }
];

const PodesenjaItems = [
  { path: RoutesEnum.ParametriVage, title: 'Parametri vage' }
];

function Header(p: Props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <SelectMenu title="Matični Podaci" menuItems={MaticniPodaciItems} />
        <SelectMenu title="Vaganja" menuItems={VaganjaItems} />
        <SelectMenu title="Izvješća" menuItems={IzvjescaItems} />
        <SelectMenu title="Baza podataka" menuItems={BazaItems} />
        <SelectMenu title="Podešenja" menuItems={PodesenjaItems} />
      </div>
      {p.children}
    </>
  );
}

export default withRouter(Header);
