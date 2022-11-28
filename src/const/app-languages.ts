import * as localizations from '../modules/i18n/localizations';
import { ILanguageLocalization } from '../modules/i18n/localizations/localizationTypes';

export const availableLocales = Object.keys(localizations) as (keyof typeof localizations)[];

export type Language = typeof availableLocales[number];

export interface ILanguage {
  locale: Language;
  defaultLanguage: Language;
};

type AvailableLanguages = 'English' | 'Spanish'; 

export const translation:  { 
  [prop in Language] : ILanguageLocalization
} = localizations;

export const appLanguage:{[key in AvailableLanguages]:Language} = {
  English: 'en',
  Spanish: 'es',
};