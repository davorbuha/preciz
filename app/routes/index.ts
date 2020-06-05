/* eslint-disable import/no-cycle */
import HomeContainer from '../containers/HomeContainer';
import VoziloContainer from '../containers/MaticniPodaci/VoziloContainer';
import VozacContainer from '../containers/MaticniPodaci/Vozac';
import PrikolicaContainer from '../containers/MaticniPodaci/Prikolica';
import RobaContainer from '../containers/MaticniPodaci/Roba';
import PartnerContainer from '../containers/MaticniPodaci/Partner';
import MjestoIsporukeContainer from '../containers/MaticniPodaci/MjestoIsporuke';
import JednoVaganjeContainer from '../containers/Vaganja/JednoVaganje';
import PrvoVaganjeContainer from '../containers/Vaganja/PrvoVaganje';
import DrugoVaganjeContainer from '../containers/Vaganja/DrugoVaganje';
import UnosVaganjaContainer from '../containers/Vaganja/UnosVaganja';
import PregledVaganjaContainer from '../containers/Izvjesca/PregledVaganja';
import PregledZaRobuContainer from '../containers/Izvjesca/PregledZaRobu';
import PregledZaKupcaContainer from '../containers/Izvjesca/PregledZaKupca';
import ArhiviranjeBazeContainer from '../containers/BazaPodataka/ArhiviranjeBaze';
import PovratakArhiveContainer from '../containers/BazaPodataka/PovratakArhive';
import BrisanjePodatakaContainer from '../containers/BazaPodataka/BrisanjePodataka';
import ParametriVageContainer from '../containers/Podesenja/ParametriVage';

interface Route {
  path: string;
  component: () => JSX.Element;
}

export enum RoutesEnum {
  Home = '/',
  MaticniPodaciVozilo = '/MaticniPodaciVozilo',
  MaticniPodaciVozac = '/MaticniPodaciVozac',
  MaticniPodaciPrikolica = '/MaticniPodaciPrikolica',
  MaticniPodaciRoba = '/MaticniPodaciRoba',
  MaticniPodaciPartner = '/MaticniPodaciPartner',
  MaticniPodaciMjestoIsporuke = '/MaticniPodaciMjestoIsporuke',
  JednoVaganje = '/JednoVaganje',
  PrvoVaganje = '/PrvoVaganje',
  DrugoVaganje = '/DrugoVaganje',
  UnosVaganja = '/UnosVaganja',
  PregledVaganja = '/PregledVaganja',
  PregledZaRobu = '/PregledZaRobu',
  PregledZaKupca = '/PregledZaKupca',
  ArhiviranjeBaze = '/ArhiviranjeBaze',
  PovratakBaze = '/PovratakBaze',
  BrisanjePodataka = '/BrisanjePodataka',
  ParametriVage = '/ParametriVage'
}

const Routes: Route[] = [
  {
    path: RoutesEnum.Home,
    component: HomeContainer
  },
  {
    path: RoutesEnum.MaticniPodaciVozilo,
    component: VoziloContainer
  },
  {
    path: RoutesEnum.MaticniPodaciVozac,
    component: VozacContainer
  },
  {
    path: RoutesEnum.MaticniPodaciPrikolica,
    component: PrikolicaContainer
  },
  {
    path: RoutesEnum.MaticniPodaciRoba,
    component: RobaContainer
  },
  {
    path: RoutesEnum.MaticniPodaciPartner,
    component: PartnerContainer
  },
  {
    path: RoutesEnum.MaticniPodaciMjestoIsporuke,
    component: MjestoIsporukeContainer
  },
  {
    path: RoutesEnum.JednoVaganje,
    component: JednoVaganjeContainer
  },
  {
    path: RoutesEnum.PrvoVaganje,
    component: PrvoVaganjeContainer
  },
  {
    path: RoutesEnum.DrugoVaganje,
    component: DrugoVaganjeContainer
  },
  {
    path: RoutesEnum.UnosVaganja,
    component: UnosVaganjaContainer
  },
  {
    path: RoutesEnum.PregledVaganja,
    component: PregledVaganjaContainer
  },
  {
    path: RoutesEnum.PregledZaRobu,
    component: PregledZaRobuContainer
  },
  {
    path: RoutesEnum.PregledZaKupca,
    component: PregledZaKupcaContainer
  },
  {
    path: RoutesEnum.ArhiviranjeBaze,
    component: ArhiviranjeBazeContainer
  },
  {
    path: RoutesEnum.PovratakBaze,
    component: PovratakArhiveContainer
  },
  {
    path: RoutesEnum.BrisanjePodataka,
    component: BrisanjePodatakaContainer
  },
  {
    path: RoutesEnum.ParametriVage,
    component: ParametriVageContainer
  }
];

export default Routes;
