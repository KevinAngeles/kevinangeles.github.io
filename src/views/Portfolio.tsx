import React, { useContext, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageContext } from '../modules/i18n';
import { translation, ILanguage, AppRoute } from '../const';
import { translateLocationPathToRouteKeys, translateRouteKeysToLocationPath } from '../utils';
import { Breadcrumbs } from '../modules/layout/components/Breadcrumbs';
import { useLocation } from 'react-router-dom';

export const Portfolio: React.FC = () => {
  const {
    locale,
    defaultLanguage
  } = useContext(LanguageContext) as ILanguage;

  const location = useLocation();
  const portfolioTranslation = translation[locale]['portfolio'];
  const projectsTranslation = translation[locale]['projects'];
  const projects = Object.entries(projectsTranslation);
  const routeKeys = translateLocationPathToRouteKeys(location.pathname+location.hash,locale,defaultLanguage);
  const hashIndex = routeKeys.indexOf('#');
  const hashKey = hashIndex >= 0 ? routeKeys.substring(hashIndex + 1) : '';
  const refs = useRef<({[k:string]: HTMLHeadingElement|null})[]>([]);

  useEffect(() => {
    setTimeout(() => {
      refs.current.some( (singleRef) => {
        if(singleRef.hasOwnProperty(hashKey)) {
          (singleRef[hashKey] as HTMLHeadingElement).scrollIntoView({behavior:'smooth',block:'start',inline:'center'});
          return true;
        }
        return false;
      });  
    },100);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="portfolio-main">
      <HelmetProvider>
        <Helmet>
          <link rel="prev" href={`/#${translateRouteKeysToLocationPath(AppRoute.About,locale,defaultLanguage,true)}`} />
          <link rel="next" href={`/#${translateRouteKeysToLocationPath(AppRoute.Contact,locale,defaultLanguage,true)}`} />
          <title>{portfolioTranslation['head.title']}</title>
          <meta
            name="description"
            content={portfolioTranslation['head.description']}
          />
          <meta
            name="keywords"
            content={portfolioTranslation['head.keywords']}
          />
        </Helmet>
      </HelmetProvider>
      <Breadcrumbs language={locale} defaultLanguage={defaultLanguage} />
      <div className="portfolio-main__container">
        <h1 className="portfolio-main__title">{portfolioTranslation['title']}</h1>
        {
          projects.map( (project,index) => {
            const projectId = project[0];
            const projectDetails = project[1]['details'];
            return (
              <section key={projectId} className="portfolio-project">
                <h2
                  id={projectId}
                  className="portfolio-project__title"
                  ref={ projectRef => refs.current[index] = { [projectId]: projectRef } }
                >
                  { projectDetails['name'] }
                </h2>
                <a
                  className="portfolio-project__link"
                  href={projectDetails['demo.link']}
                  rel="nofollow"
                >
                  <figure className="portfolio-project__figure">
                    <img
                    className="portfolio-project__image"
                      src={projectDetails['image.src']}
                      title={projectDetails['image.title']}
                      alt={projectDetails['image.alt']}
                    />
                    <figcaption className="portfolio-project__name">
                      {projectDetails['name']}
                    </figcaption>
                  </figure>
                </a>
                <p className="portfolio-project__label">{projectDetails['description.label']}</p>
                <p className="portfolio-project__description">{projectDetails['description.text']}</p>
                <p className="portfolio-project__label">{projectDetails['code.label']}</p>
                <p className="portfolio-project__description">
                  {
                    (projectDetails['code.link'].length > 0) ?
                    (
                      <a
                        href={projectDetails['code.link']}
                        className="portfolio-project__link-default"
                      >{projectDetails['code.link']}</a>
                    )
                      :
                    (
                      projectDetails['code.description'] 
                    )
                  }
                </p>
                <p className="portfolio-project__label">{projectDetails['demo.label']}</p>
                <p className="portfolio-project__description">
                  <a
                    href={projectDetails['demo.link']}
                    className="portfolio-project__link-default"
                  >{projectDetails['demo.link']}</a>
                </p>
                <p className="portfolio-project__label">{projectDetails['technology.label']}</p>
                <ul className="portfolio-project__list">
                  {
                    projectDetails['technology.items'].map( (item) => (
                      <li key={item} className="portfolio-project__item">{ item }</li>
                    ))
                  }
                </ul>
              </section>
            );
          })
        }
      </div>
    </main>
  );
};