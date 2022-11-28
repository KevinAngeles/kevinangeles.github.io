import { ILanguageLocalization } from '../localizationTypes';
import { about } from './about';
import { app } from './app';
import { contact } from './contact';
import { home } from './home';
import { portfolio } from './portfolio';
import { projects } from './projects';
import { routes } from './routes';

export const es: ILanguageLocalization = {
  routes: routes,
  projects: projects,
  app: app,
  home: home,
  about: about,
  portfolio: portfolio,
  contact: contact,
};