import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, ILanguage, translation } from '../../../const';
import { translateLocationPathToRouteKeys, translateRouteKeysToLocationPath } from '../../../utils';

export const Navigation: React.FC<ILanguage> = ({locale,defaultLanguage}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const currentRouteKey = translateLocationPathToRouteKeys(pathname,locale,defaultLanguage);
  const localeTranslation = translation[locale];
  const localeRoute = localeTranslation['routes'];
  const localeProjects = localeTranslation['projects'];

  const projectIds = Object.keys(localeProjects) as (keyof typeof localeProjects)[];
  type ProjectId = typeof projectIds[number];

  const projects = projectIds.reduce(
    (accumulator,projectIdentifier) => {
      accumulator[projectIdentifier] = {
        url: translateRouteKeysToLocationPath(`portfolio#${projectIdentifier}`,locale,defaultLanguage),
        name: localeProjects[projectIdentifier]['details']['name'],
        title: localeProjects[projectIdentifier]['details']['navigation.title'],
      };
      return accumulator;
    },{} as {[id in ProjectId]:{url: string,name: string,title: string}}
  );

  interface ITranslatedRoutes {
    home: {
      url: string,
      title: string,
      name: string,
    },
    about: {
      index: {
        url: string,
        title: string,
        name: string,
      },
      education: {
        url: string,
        title: string,
        name: string,
      },
      certificates: {
        url: string,
        title: string,
        name: string,
      },
    },
    contact: {
      url: string,
      title: string,
      name: string,
    },
    portfolio: {
      index: {
        url: string,
        title: string,
        name: string,
      }
      projects: {
        [id in ProjectId]: {
          url: string,
          title: string,
          name: string,
        }
      }
    }
  }

  const translatedRoutes: ITranslatedRoutes = {
    home: {
      url: translateRouteKeysToLocationPath(AppRoute.Home,locale,defaultLanguage,true),
      title: localeRoute[AppRoute.Home]['details']['title'],
      name: localeRoute[AppRoute.Home]['details']['name'],
    },
    about: {
      index: {
        url: translateRouteKeysToLocationPath(AppRoute.About,locale,defaultLanguage,true),
        title: localeRoute[AppRoute.About]['details']['title'],
        name: localeRoute[AppRoute.About]['details']['name'],
      },
      education: {
        url: translateRouteKeysToLocationPath(AppRoute.AboutEducation,locale,defaultLanguage,true),
        title: localeRoute[AppRoute.About]['subpath']['education']['details']['title'],
        name: localeRoute[AppRoute.About]['subpath']['education']['details']['name'],
      },
      certificates: {
        url: translateRouteKeysToLocationPath(AppRoute.AboutCertificates,locale,defaultLanguage,true),
        title: localeRoute[AppRoute.About]['subpath']['certificates']['details']['title'],
        name: localeRoute[AppRoute.About]['subpath']['certificates']['details']['name'],
      },
    },
    portfolio: {
      index: {
        url: translateRouteKeysToLocationPath(AppRoute.Portfolio,locale,defaultLanguage,true),
        title: localeRoute[AppRoute.Portfolio]['details']['title'],
        name: localeRoute[AppRoute.Portfolio]['details']['name'],
      },
      projects: projects
    },
    contact: {
      url: translateRouteKeysToLocationPath(AppRoute.Contact,locale,defaultLanguage,true),
      title: localeRoute[AppRoute.Contact]['details']['title'],
      name: localeRoute[AppRoute.Contact]['details']['name'],
    }
  };

  return (
    <nav className="site-navigation">
      <ul className="site-navigation__list site-navigation__list--collapsed">
        <li className={`site-navigation__item${ (currentRouteKey === AppRoute.Home) && ' site-navigation__item--active'}`}>
          <Link 
            to={translatedRoutes['home']['url']}
            title={translatedRoutes['home']['title']}
            className="site-navigation__link"
          >
            {translatedRoutes['home']['name']}
          </Link>
        </li>
        <li className={`site-navigation__item site-navigation__dropdown${ (currentRouteKey === AppRoute.About) && ' site-navigation__item--active'}`}>
          <Link
            to={translatedRoutes['about']['index']['url']}
            title={translatedRoutes['about']['index']['title']}
            className="site-navigation__link site-navigation__link--dropdown"
          >
            {translatedRoutes['about']['index']['name']}
          </Link>
          <ul className="site-navigation__sublist" role="menu">
            <li className="site-navigation__subitem">
              <Link
                to={translatedRoutes['about']['education']['url']}
                title={translatedRoutes['about']['education']['title']}
                className="site-navigation__sublink"
              >
                {translatedRoutes['about']['education']['name']}
              </Link>
            </li>
            <li className="site-navigation__subitem">
              <Link
                to={translatedRoutes['about']['certificates']['url']}
                title={translatedRoutes['about']['certificates']['url']}
                className="site-navigation__sublink"
              >
                {translatedRoutes['about']['certificates']['name']}
              </Link>
            </li>
          </ul>
        </li>
        <li className={`site-navigation__item site-navigation__dropdown${ (currentRouteKey === AppRoute.Portfolio) && ' site-navigation__item--active'}`}>
          <Link
            to={translatedRoutes['portfolio']['index']['url']}
            title={translatedRoutes['portfolio']['index']['title']}
            className="site-navigation__link site-navigation__link--dropdown"
          >
            {translatedRoutes['portfolio']['index']['name']}
          </Link>
          <ul className="site-navigation__sublist" role="menu">
            {
              Object.entries(projects).map(project => {
                const projectId = project[0];
                const projectDetails = project[1];

                return (
                  <li key={projectId} className="site-navigation__subitem">
                    <Link
                      to={projectDetails['url']}
                      title={projectDetails['title']}
                      className="site-navigation__sublink"
                    >
                      {projectDetails['name']}
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </li>
        <li className={`site-navigation__item${ (currentRouteKey === AppRoute.Contact) && ' site-navigation__item--active'}`}>
          <Link
            to={translatedRoutes['contact']['url']}
            title={translatedRoutes['contact']['title']}
            className="site-navigation__link"
          >
            {translatedRoutes['contact']['name']}
          </Link>
        </li>
      </ul>
    </nav>
  )
};