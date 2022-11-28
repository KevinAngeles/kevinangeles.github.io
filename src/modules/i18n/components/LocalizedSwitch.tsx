import React, { useContext } from 'react';
import { RouteProps } from 'react-router';
import { Routes } from 'react-router-dom';
import { ILanguage } from '../../../const';
import { translateRouteKeysToLocationPath } from '../../../utils';
import { LanguageContext } from './LocalizedRouter';

interface Props {
  children: React.ReactNode;
}

export const LocalizedSwitch: React.FC<Props> = ({ children }) => {
  const {
    defaultLanguage,
    locale,
  } = useContext(LanguageContext) as ILanguage;
  /**
   * inject params and formatMessage through hooks, so we can localize the route
   */
  console.log(`locale is: ${JSON.stringify(locale)}`);
  /**
   *
   * @param path can be string, undefined or string array
   * @returns Localized string path or path array
   */
  function localizeRoutePath(path?: string) {
    if(typeof path === 'undefined' || path === '*') {
      return path;
    }
    return translateRouteKeysToLocationPath(path,locale,defaultLanguage);
  }

  /**
   * Apply localization to all routes
   * Also checks if all children elements are <Route /> components
   */
  return (
    <Routes>
      {React.Children.map(children, (child) =>
        React.isValidElement<RouteProps>(child)
          ? React.cloneElement(child, {
              ...child.props,
              path: localizeRoutePath(child.props.path),
            })
          : child
      )}
    </Routes>
  );
};