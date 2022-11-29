import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageContext } from '../modules/i18n';
import { AppRoute, ILanguage, translation } from '../const';
import { translateRouteKeysToLocationPath } from '../utils';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const {
    locale,
    defaultLanguage
  } = useContext(LanguageContext) as ILanguage;

  const homeTranslation = translation[locale]['home'];
  const projectsTranslation = translation[locale]["projects"];
  const projects = Object.entries(projectsTranslation).map( (project) => {
    const projectId = project[0];
    const projectLocationPath = translateRouteKeysToLocationPath(`${AppRoute.Portfolio}#${projectId}`,locale,defaultLanguage);
    const projectDetails = project[1]['details'];
    return {
      'navigation.title': projectDetails['navigation.title'],
      'navigation.url': projectLocationPath,
      'image.src': projectDetails['image.src'],
      'image.alt': projectDetails['image.alt'],
      'name': projectDetails['name'],
    };
  });
  return (
    <main className="home-main">
      <HelmetProvider>
        <Helmet>
          <link rel="next" href={`/#${translateRouteKeysToLocationPath('about',locale,defaultLanguage,true)}`} />
          <title>{homeTranslation['head.title']}</title>
          <meta
            name="description"
            content={homeTranslation['head.description']}
          />
          <meta
            name="keywords"
            content={homeTranslation['head.keywords']}
          />
        </Helmet>
      </HelmetProvider>
      <figure className="home-slide">
        <img
          src={homeTranslation['slide.src']}
          alt={homeTranslation['slide.alt']}
          className="home-slide__image"
        />
        <figcaption className="home-slide__overlay">
          <p className="home-slide__description">{homeTranslation['slide.caption']}</p>
        </figcaption>
      </figure>
      <div className="home-main__container">
        <section className="home-service">
          <figure className="home-service__card home-service__card--dark-purple">
            <img
              src={homeTranslation['service.backend.src']}
              alt={homeTranslation['service.backend.alt']}
              className="home-service__image"
            />
            <figcaption className="home-service__caption">
              <p className="home-service__name">{homeTranslation['service.backend.title']}</p>
              <p className="home-service__description">{homeTranslation['service.backend.description']}</p>
            </figcaption>
          </figure>
          <figure className="home-service__card home-service__card--regular-purple">
            <img
              src={homeTranslation['service.frontend.src']}
              alt={homeTranslation['service.frontend.alt']}
              className="home-service__image"
            />
            <figcaption className="home-service__caption">
              <p className="home-service__name">{homeTranslation['service.frontend.title']}</p>
              <p className="home-service__description">{homeTranslation['service.frontend.description']}</p>
            </figcaption>
          </figure>
          <figure className="home-service__card home-service__card--light-purple">
            <img
              src={homeTranslation['service.versioncontrol.src']}
              alt={homeTranslation['service.versioncontrol.alt']}
              className="home-service__image"
            />
            <figcaption className="home-service__caption">
              <p className="home-service__name">{homeTranslation['service.versioncontrol.title']}</p>
              <p className="home-service__description">
                {homeTranslation['service.versioncontrol.description']}
                <a
                  href="https://github.com/KevinAngeles/"
                  title={homeTranslation['service.versioncontrol.link_title']}
                  className="home-service__link"
                >
                  {homeTranslation['service.versioncontrol.link_content']}
                </a>
              </p>
            </figcaption>
          </figure>
        </section>
        <section className="home-project">
          <h2 className="home-project__title">{homeTranslation['projects.title']}</h2>
          <div className="home-project__container">
            {
              projects.map( (project) => {
                return (
                  <Link
                    to={project['navigation.url']}
                    key={project['name']}
                    title={project['navigation.title']}
                    className="home-project_link">
                    <figure className="home-project__card">
                      <img
                        src={project['image.src']}
                        alt={project['image.alt']}
                        className="home-project__image"
                      />
                      <figcaption className="home-project__caption">{project['name']}</figcaption>
                    </figure>
                  </Link>
                );
              })
            }
          </div>
        </section>
      </div>
    </main>
  );
};