import HomeContainer from '../containers/HomeContainer';
import VoziloContainer from '../containers/MaticniPodaci/Vozilo';

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
  }
];

export default Routes;
