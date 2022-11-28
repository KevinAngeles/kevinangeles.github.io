import { ILanguageLocalization } from "../localizationTypes";
import { routes } from "./routes";
import { projects } from "./projects";
import { app } from "./app";
import { home } from "./home";
import { about } from "./about";
import { portfolio } from "./portfolio";
import { contact } from "./contact";

export const en: ILanguageLocalization = {
  routes: routes,
  projects: projects,
  app: app,
  home: home,
  about: about,
  portfolio: portfolio,
  contact: contact,
};