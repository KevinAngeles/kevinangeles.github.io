import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, Language, translation } from '../../../const';
import { translateLocationPathToRouteKeys, translateRouteKeysToLocationPath } from '../../../utils';
import { IPathStrings } from '../../i18n/localizations/localizationTypes/RouteStrings';

interface ILanguages {
  language: Language,
  defaultLanguage: Language
}

export const Breadcrumbs: React.FC<ILanguages> = ({ language, defaultLanguage }) => {
  const location = useLocation();
  let routeTranslation:IPathStrings = translation[language]['routes'];

  const routeKeys = translateLocationPathToRouteKeys(
    location.pathname,
    language,
    defaultLanguage,
  );

  const routeKeysArray = routeKeys.split('.');
  let totalBreadcrumbs = [];

  try {
    const breadcrumbs = routeKeysArray.map( (routeKey,index) => {
      if(!routeTranslation.hasOwnProperty(routeKey)) {
        throw new Error(`routeKey ${routeKey} does not exist.`);
      }
      const currentRouteKey = routeKeysArray.slice(0,index+1).join('.');
      const currentBreadcrumb = {
        name: routeTranslation[routeKey]['details']['name'],
        url: translateRouteKeysToLocationPath(currentRouteKey,language,defaultLanguage,true)
      };
      if(index < (routeKeysArray.length - 1)) {
        if(routeTranslation[routeKey].hasOwnProperty('subpath')) {
          throw new Error(`routeKey ${routeKey} does not have subpath.`);
        }
        routeTranslation = routeTranslation[routeKey]['subpath'] as IPathStrings;
      }
      return currentBreadcrumb;
    });
    if(routeKeysArray.length > 0 && !routeKeysArray.hasOwnProperty(AppRoute.Home)) {
      totalBreadcrumbs.push({
        name: routeTranslation[AppRoute.Home]['details']['name'],
        url: translateRouteKeysToLocationPath(AppRoute.Home,language,defaultLanguage,true)
      });
    }
    totalBreadcrumbs.push(...breadcrumbs);
  } catch(error) {
    console.log(`Breadcrumbs - warning: ${error}`);
  }

  return (
    <section className="breadcrumb">
      {
        totalBreadcrumbs.map( (breadcrumb,index) => (
          <Fragment key={index}>
            <div
              itemScope
              itemType="http://schema.org/BreadcrumbList"
              className="breadcrumb__item"
            >
              <div
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
                <Link
                  to={breadcrumb['url']}
                  itemProp="url"
                  className="breadcrumb__link"
                >
                  <span itemProp="name">{breadcrumb['name']}</span>
                </Link>
                <meta itemProp="position" content={`${index+1}`} />
              </div>
            </div>
            {
              (index < (totalBreadcrumbs.length - 1)) &&
              (<span> / </span>)
            }
          </Fragment>
        ))
      }
    </section>
  );
};