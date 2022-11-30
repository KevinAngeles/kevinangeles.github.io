import React from 'react';
import { Route, useLocation, Routes, HashRouter } from 'react-router-dom';
import { Language, availableLocales, ILanguage } from '../../../const';
import { useAnalytics } from '../../../utils';

export const LanguageContext = React.createContext<ILanguage | null>(null)

interface IRoute {
  children: React.ReactNode;
  defaultLanguage: Language;
}

interface Props extends IRoute {
  RouterComponent: typeof HashRouter;
}

const LocalizedRoute: React.FC<IRoute> = ({
  children,
  defaultLanguage,
}) => {
  const location = useLocation();
  /**
   * Get current language
   * Set default locale to en if base path is used without a language
   */
  const languagesWithoutDefault: Language[] =
    Object.values(availableLocales)
      .filter(
        language => language !== defaultLanguage
      );
  
  let lang: Language = defaultLanguage;
  const pathname = location.pathname;
  if(
    (
      pathname.length === 3 ||
      (
        pathname.length > 3 && pathname.charAt(3) === '/'
      )
    ) && (
      languagesWithoutDefault.includes(pathname.substring(1,3) as Language)
    )
  ) {
    lang = pathname.substring(1,3) as Language;
  }

  console.log(`lang is: ${JSON.stringify(lang)}`);
  console.log(`location is: ${JSON.stringify(location)}`);

  const languageDetails = {
    locale: lang,
    defaultLanguage: defaultLanguage
  }

  useAnalytics();

  return (
    <LanguageContext.Provider value={languageDetails}>
      {children}
    </LanguageContext.Provider>
  );
};

export const LocalizedRouter: React.FC<Props> = ({
  children,
  RouterComponent,
  defaultLanguage,
}) => {
  const languagesWithoutDefault: string[] = 
    Object
      .values(availableLocales)
      .filter(
        language => language !== defaultLanguage
      );
  return (
    <RouterComponent>
      <Routes>
        {
          languagesWithoutDefault.map(language => (
            <Route 
              path={`/${language}/*`}
              key={language}
              element={
                <LocalizedRoute
                  defaultLanguage={defaultLanguage}
                  children={children}
                />
              }
            />
          ))
        }
        <Route
          path="/*"
          element={
            <LocalizedRoute
              defaultLanguage={defaultLanguage}
              children={children}
            />
          }
        />
      </Routes>
    </RouterComponent>
  )
};