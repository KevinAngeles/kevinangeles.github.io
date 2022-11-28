import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageContext } from '../modules/i18n';
import { ILanguage, translation } from '../const';
import { translateRouteKeysToLocationPath } from '../utils';
import { AboutCertificateWithLinkStrings } from '../modules/i18n/localizations/localizationTypes/AboutStrings';
import { Breadcrumbs } from '../modules/layout/components/Breadcrumbs';

export const About: React.FC = () => {
  const {
    locale,
    defaultLanguage
  } = useContext(LanguageContext) as ILanguage;

  const aboutTranslation = translation[locale]['about'];
  const routesTranslation = translation[locale]['routes'];
  const educationTranslation = aboutTranslation['education'];
  const certificatesTranslation = aboutTranslation['certificates'];
  
  return (
    <main className="main">
      <HelmetProvider>
        <Helmet>
          <link rel="prev" href={translateRouteKeysToLocationPath('home',locale,defaultLanguage)} />
          <link rel="next" href={translateRouteKeysToLocationPath('portfolio',locale,defaultLanguage)} />
          <title>{aboutTranslation['head.title']}</title>
          <meta
            name="description"
            content={aboutTranslation['head.description']}
          />
          <meta
            name="keywords"
            content={aboutTranslation['head.keywords']}
          />
          <link rel="stylesheet" href="/css/about.css" media="screen" />
        </Helmet>
      </HelmetProvider>
      <Breadcrumbs language={locale} defaultLanguage={defaultLanguage} />
      <div className="main__container">
        <h1 className="main__title">{aboutTranslation['title']}</h1>
        <section className="universities">
          <h2
            id={routesTranslation['about']['subpath']['education']['path']}
            className="universities__title">{routesTranslation['about']['subpath']['education']['details']['name']}
          </h2>
          <div className="university university__texas">
            <h3 className="university__name">{educationTranslation['utexas']['name']}</h3>
            <p className="university__label">{educationTranslation['utexas']['location']['label']}</p>
            <p className="university__description">{educationTranslation['utexas']['location']['value']}</p>
            <p className="university__label">{educationTranslation['utexas']['major']['label']}</p>
            <p className="university__description">{educationTranslation['utexas']['major']['value']}</p>
            <p className="university__label">{educationTranslation['utexas']['minor']['label']}</p>
            <p className="university__description">{educationTranslation['utexas']['minor']['value']}</p>
            <p className="university__label">{educationTranslation['utexas']['activities']['label']}</p>
            <ul className="university__list">
              {
                educationTranslation['utexas']['activities']['values'].map( (activity) => (
                  <li className="university__item">{activity}</li>                    
                ))
              }
            </ul>
            <figure className="university__picture1">
              <img
                className="university__image1"
                src={educationTranslation['utexas']['logo']['source']}
                title={educationTranslation['utexas']['logo']['title']}
                alt={educationTranslation['utexas']['logo']['alt']}
              />
            </figure>
            <figure className="university__picture2">
              <img
                className="university__image2"
                src={educationTranslation['utexas']['photo']['source']}
                title={educationTranslation['utexas']['photo']['title']}
                alt={educationTranslation['utexas']['photo']['alt']}
              />
            </figure>
          </div>
          <div className="university university__usil">
            <h3 className="university__name">{educationTranslation['usil']['name']}</h3>
            <p className="university__label">{educationTranslation['usil']['location']['label']}</p>
            <p className="university__description">{educationTranslation['usil']['location']['value']}</p>
            <p className="university__label">{educationTranslation['usil']['major']['label']}</p>
            <p className="university__description">{educationTranslation['usil']['major']['value']}</p>
            <p className="university__label">{educationTranslation['usil']['activities']['label']}</p>
            <ul className="university__list">
              {
                educationTranslation['usil']['activities']['values'].map( (activity) => (
                  <li className="university__item">{activity}</li>
                ))
              }
            </ul>
            <figure className="university__picture1">
              <img
                className="university__image1"
                src={educationTranslation['usil']['logo']['source']}
                title={educationTranslation['usil']['logo']['title']}
                alt={educationTranslation['usil']['logo']['alt']}
              />
            </figure>
            <figure className="university__picture2">
              <img
                className="university__image2"
                src={educationTranslation['usil']['photo']['source']}
                title={educationTranslation['usil']['photo']['title']}
                alt={educationTranslation['usil']['photo']['alt']}
              />
            </figure>
          </div>
        </section>
        <section className="certificates">
          <h2
            id={routesTranslation['about']['subpath']['certificates']['path']}
            className="certificates__title">{routesTranslation['about']['subpath']['certificates']['details']['name']}
          </h2>
          {
            certificatesTranslation.map( (certificate) => (
              <div className="certificate">
                <h3 className="certificate__name" lang={certificate['lang']}>
                  { certificate['title'] }
                </h3>
                {
                  certificate.hasOwnProperty('link') ? (
                    <a
                      className="certificate__link"
                      href={(certificate as AboutCertificateWithLinkStrings)['link']['url']}
                      title={(certificate as AboutCertificateWithLinkStrings)['link']['title']}
                    >
                      <figure>
                        <img
                          className="certificate__image"
                          src={certificate['image']['src']}
                          title={certificate['image']['title']}
                          alt={certificate['image']['alt']}
                        />
                        <figcaption className="certificate__caption">{ certificate['caption'] }</figcaption>
                      </figure>
                    </a>  
                  ) 
                    :
                  (
                    <figure>
                      <img
                        className="certificate__image"
                        src={certificate['image']['src']}
                        title={certificate['image']['title']}
                        alt={certificate['image']['alt']}
                      />
                      <figcaption className="certificate__caption">{ certificate['caption'] }</figcaption>
                    </figure>
                  )
                }
                {
                  certificate['data'].map( (data) => (
                    <p>{ data['label'] }: { data['value'] }</p>
                  ))
                }
              </div>
            ))
          }
        </section>
      </div>
    </main>
  );
};