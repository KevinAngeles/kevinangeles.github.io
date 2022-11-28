import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageContext } from '../modules/i18n';
import { translation, ILanguage } from '../const';
import { translateRouteKeysToLocationPath } from '../utils';
import { Breadcrumbs } from '../modules/layout/components/Breadcrumbs';

export const Portfolio: React.FC = () => {
  const {
    locale,
    defaultLanguage
  } = useContext(LanguageContext) as ILanguage;

  const portfolioTranslation = translation[locale]['portfolio'];
  const projectsTranslation = translation[locale]['projects'];
  const projects = Object.entries(projectsTranslation);
  
  return (
    <main className="main">
      <HelmetProvider>
        <Helmet>
          <link rel="prev" href={translateRouteKeysToLocationPath('about',locale,defaultLanguage)} />
          <link rel="next" href={translateRouteKeysToLocationPath('contact',locale,defaultLanguage)} />
          <title>{portfolioTranslation['head.title']}</title>
          <meta
            name="description"
            content={portfolioTranslation['head.description']}
          />
          <meta
            name="keywords"
            content={portfolioTranslation['head.keywords']}
          />
          <link rel="stylesheet" href="/css/portfolio.css" media="screen" />
        </Helmet>
      </HelmetProvider>
      <Breadcrumbs language={locale} defaultLanguage={defaultLanguage} />
      <div className="main__container">
        <h1 className="main__title">{portfolioTranslation['title']}</h1>
        {
          projects.map( (project) => {
            const projectId = project[0];
            const projectDetails = project[1]['details'];
            return (
              <section key={projectId} className="project">
                <h2 id={projectId} className="project__title">{ projectDetails['name'] }</h2>
                <a
                  className="project__link"
                  href={projectDetails['demo.link']}
                  rel="nofollow"
                >
                  <figure className="project__figure">
                    <img
                    className="project__image"
                      src={projectDetails['image.src']}
                      title={projectDetails['image.title']}
                      alt={projectDetails['image.alt']}
                    />
                    <figcaption className="project__name">
                      {projectDetails['name']}
                    </figcaption>
                  </figure>
                </a>
                <p className="project__label">{projectDetails['description.label']}</p>
                <p className="project__description">{projectDetails['description.text']}</p>
                <p className="project__label">{projectDetails['code.label']}</p>
                <p className="project__description">
                  {
                    (projectDetails['code.link'].length > 0) ?
                    (
                      <a
                        href={projectDetails['code.link']}
                        className="project__link-default"
                      >{projectDetails['code.link']}</a>
                    )
                      :
                    (
                      projectDetails['code.description'] 
                    )
                  }
                </p>
                <p className="project__label">{projectDetails['demo.label']}</p>
                <p className="project__description">
                  <a
                    href={projectDetails['demo.link']}
                    className="project__link-default"
                  >{projectDetails['demo.link']}</a>
                </p>
                <p className="project__label">{projectDetails['technology.label']}</p>
                <ul className="project__list">
                  {
                    projectDetails['technology.items'].map( (item) => (
                      <li key={item} className="project__item">{ item }</li>
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