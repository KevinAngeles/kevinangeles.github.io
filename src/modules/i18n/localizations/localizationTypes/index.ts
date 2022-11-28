import { RouteStrings } from './RouteStrings';
import { HomeStrings } from './HomeStrings';
import { AppStrings } from './AppStrings';
import { AboutStrings } from './AboutStrings';
import { PortfolioStrings } from './PortfolioStrings';
import { ContactStrings } from './ContactStrings';
import { ProjectStrings } from './ProjectStrings';

export type ILanguageLocalization = {
  routes: RouteStrings,
  projects: ProjectStrings,
  app: AppStrings,
  home: HomeStrings,
  about: AboutStrings,
  portfolio: PortfolioStrings,
  contact: ContactStrings,
}