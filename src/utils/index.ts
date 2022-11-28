import { Language, translation } from "../const";
import { IPathStrings } from "../modules/i18n/localizations/localizationTypes/RouteStrings";

/**
 * Create language prefix.
 * 
 * @param {Language} language - language to translate to
 * @param {Language} defaultLanguage - default language
 * @returns Localized string language prefix
 */
const createLanguagePrefix = (
  language: Language,
  defaultLanguage: Language
):string => {
  let languagePrefix = '/';
  if(language !== defaultLanguage) {
    languagePrefix += `${language}/`;
  }
  return languagePrefix;
};

/**
 * Translate original route keys to location path.
 * If parameter includePrefixLanguage is not included, it will return
 * location path without language prefix 
 * 
 * @param {string} routeKeys - route keys separated by dots
 * @param {Language} language - language to translate to
 * @param {Language} defaultLanguage - default language
 * @param {boolean} [includeLanguagePrefix] - include prefix language (optional)
 * @returns Localized string path
 */
export const translateRouteKeysToLocationPath = (
  routeKeys: string,
  language: Language,
  defaultLanguage: Language,
  includeLanguagePrefix?: boolean,
):string => {
  try {
    console.log(`utils routekeys: ${routeKeys} language:${language} default:${defaultLanguage}`);
    if(routeKeys === '') {
      throw new Error("routeKeys is empty.");
    } else if(/\s/.test(routeKeys)) {
      throw new Error("routeKeys contains white space.");
    }
    const routeKeysRegex = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(#[A-Za-z0-9]*)?$/;
    if(!routeKeysRegex.test(routeKeys)) {
      throw new Error("routeKeys does not have the correct format.");
    }
    let translatedLocationPath = '';
    if(includeLanguagePrefix) {
      translatedLocationPath = createLanguagePrefix(language,defaultLanguage);
    }
    let routeTranslation:IPathStrings = translation[language]['routes'];
    // in case a location path has the format path1.path2.path3#subpath1
    let pathKeys = routeKeys;
    let hashKey = '';
    if(routeKeys.includes('#')) {
      [pathKeys, hashKey] = routeKeys.split('#');
    }
    let paths = pathKeys.split('.');
    if(paths.length === 1 && paths[0] === 'error') {
      throw new Error(`routeKey is error.`);
    }
    let pathItem = {} as IPathStrings[string];
    let locationPathWithoutPrefix = paths.map((routeKey,index) => {
      if(!routeTranslation.hasOwnProperty(routeKey)) {
        throw new Error(`routeKey ${routeKey} does not exist.`);
      }
      pathItem = routeTranslation[routeKey as keyof typeof routeTranslation];
      const translatedPath = pathItem['path'];
      const isLastRouteKey = index === (paths.length - 1);
      if(!isLastRouteKey && !pathItem.hasOwnProperty('subpath')) {
        throw new Error(`routeKey ${routeKey} does not have subpath.`);
      }
      if(!isLastRouteKey) {
        routeTranslation = pathItem['subpath'] as IPathStrings;
      }
      return translatedPath;
    }).join('/');
    if(!includeLanguagePrefix || locationPathWithoutPrefix !== '/') {
      translatedLocationPath += locationPathWithoutPrefix;
    }
    if(hashKey === '') {
      return translatedLocationPath;
    }
    if(
      pathItem.hasOwnProperty('subpath') &&
      (pathItem['subpath'] as IPathStrings).hasOwnProperty(hashKey)
    ) {
      routeTranslation = pathItem['subpath'] as IPathStrings;
      translatedLocationPath += `#${routeTranslation[hashKey as keyof typeof routeTranslation]['path']}`;
    } else {
      translatedLocationPath += `#${hashKey}`;
      console.log(`utils translateRouteKeysToLocationPath warning: hashKey ${hashKey} not found.`);
    }
    return translatedLocationPath;
  } catch (error) {
    console.log(`utils translateRouteKeysToLocationPath error: ${error}.`);
    let translatedLocationPath = '';
    if(includeLanguagePrefix) {
      translatedLocationPath = createLanguagePrefix(language,defaultLanguage);
    }
    translatedLocationPath += 'error';
    return translatedLocationPath;
  }
};

/**
 * Translate location path to original routes keys. If the location 
 * path is incorrect, it will return the string "error".
 *
 * @param {string} locationPath - location path
 * @param {Language} language - language of the location path
 * @param {Language} defaultLanguage - default language
 * @returns Original string route keys
 */
export const translateLocationPathToRouteKeys = (
  locationPath:string,
  language:Language,
  defaultLanguage:Language,
):string => {
  try {
    if(locationPath === '') {
      throw new Error("locationPath is empty.");
    } else if(/\s/.test(locationPath)) {
      throw new Error("locationPath contains white space.");
    }
    const locationPathRegex = /^(\/|(\/[A-Za-z0-9]+(-[A-Za-z0-9]+)*)+(\/|(#[A-Za-z0-9]+(-[A-Za-z0-9]+)*))?)$/;
    if(!locationPathRegex.test(locationPath)) {
      throw new Error("locationPath does not have the correct format.");
    }

    // in case a location path has the format path1.path2.path3#subpath1
    let fullLocationPath = locationPath;
    let hashKey = '';
    if(fullLocationPath.includes('#')) {
      [fullLocationPath, hashKey] = fullLocationPath.split('#');
    }

    const languageTranslation = translation[language];

    let locationPathArray = (fullLocationPath === '/') ?
      ['/']
        :
      fullLocationPath.replace(/^\/|\/$/g, '').split('/');

    if(language !== defaultLanguage) {
      locationPathArray = locationPathArray.slice(1);
    }

    // If locationPathArray is empty, it means that it had only the language prefix
    // which was removed in the previous step. Therefore, we have to add "/" to the
    // locationPathArray for the home index
    if(locationPathArray.length === 0) {
      locationPathArray = ['/'];
    }

    let languageRoutes:IPathStrings = languageTranslation['routes'];
    let languageRouteItem = {} as IPathStrings[string];
    let lastKey:string|undefined = "";

    let originalRouteKeys = '';
    originalRouteKeys += locationPathArray.map(
      (path,index) => {
        let routeKey = path;

        lastKey = Object.keys(languageRoutes).find( key => {
          return languageRoutes[key as keyof typeof languageRoutes]['path'] === routeKey;
        });

        if(typeof lastKey !== "string") {
          throw new Error(`Path ${path} not found`);
        }

        routeKey = lastKey;
        languageRouteItem = languageRoutes[lastKey as keyof typeof languageRoutes];
        const isLastPath = index === (locationPathArray.length - 1);
        if(!isLastPath && !languageRouteItem.hasOwnProperty('subpath')) {
          throw new Error(`path ${path} does not have subpath.`);
        }
        if(!isLastPath) {
          languageRoutes = languageRouteItem['subpath'] as IPathStrings;
        }
        return routeKey;
      }
    ).join('.');

    if(hashKey === '') {
      return originalRouteKeys;
    }

    if(!languageRouteItem.hasOwnProperty('subpath')) {
      originalRouteKeys += `#${hashKey}`;
      console.log(`utils translateLocationPathToRouteKeys warning: there is no subpath for hashKey ${hashKey}.`);
      return originalRouteKeys;
    }

    languageRoutes = languageRouteItem['subpath'] as IPathStrings;
    lastKey = Object.keys(languageRoutes).find( key => {
      return languageRoutes[key as keyof typeof languageRoutes]['path'] === hashKey;
    });
    
    if(typeof lastKey === "string") {
      originalRouteKeys += `#${lastKey}`;
    } else {
      originalRouteKeys += `#${hashKey}`;
      console.log(`utils translateLocationPathToRouteKeys warning: hashKey ${hashKey} not found.`);
    }
    
    return originalRouteKeys;
  } catch (error) {
    console.log(`utils translateLocationPathToRouteKeys error: ${error}.`);
    return 'error';
  }
};

/**
 * Translate location path to other language
 *
 * @param {string} locationPath - current location path
 * @param {Language} locale - language of the current location path
 * @param {Language} language - language to translate to
 * @param {Language} defaultLanguage - default language
 * @returns Localized string path
 */
export const translateLocationPathToOtherLanguage = (
  locationPath:string,
  locale:Language,
  language:Language,
  defaultLanguage:Language,
):string => {
  const originalRouteKeys = translateLocationPathToRouteKeys(
    locationPath,
    locale,
    defaultLanguage
  );
  console.log(`utils locationPath ${locationPath} originalRouteKeys ${originalRouteKeys}`);
  const translatedPath = translateRouteKeysToLocationPath(
    originalRouteKeys,
    language,
    defaultLanguage,
    true
  );
  console.log(`===utils locationPath ${locationPath} locationPath ${translatedPath}===`);

  return translatedPath;
};