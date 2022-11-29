import React, { useContext, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageContext } from '../modules/i18n';
import { AppRoute, ILanguage, translation } from '../const';
import { translateLocationPathToRouteKeys, translateRouteKeysToLocationPath } from '../utils';
import { AboutCertificateWithLinkStrings } from '../modules/i18n/localizations/localizationTypes/AboutStrings';
import { Breadcrumbs } from '../modules/layout/components/Breadcrumbs';
import { useLocation } from 'react-router-dom';

export const About: React.FC = () => {
  const {
    locale,
    defaultLanguage
  } = useContext(LanguageContext) as ILanguage;

  const location = useLocation();
  const routeKeys = translateLocationPathToRouteKeys(location.pathname+location.hash,locale,defaultLanguage);
  const hashIndex = routeKeys.indexOf('#');
  const hashKey = hashIndex >= 0 ? routeKeys.substring(hashIndex + 1) : '';
  const refs = useRef<({[k:string]: HTMLHeadingElement|null})[]>([]);
  const aboutTranslation = translation[locale]['about'];
  const routesTranslation = translation[locale]['routes'];
  const educationTranslation = aboutTranslation['education'];
  const certificatesTranslation = aboutTranslation['certificates'];

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
    <main className="main">
      <HelmetProvider>
        <Helmet>
          <link rel="prev" href={`/#${translateRouteKeysToLocationPath(AppRoute.Home,locale,defaultLanguage,true)}`} />
          <link rel="next" href={`/#${translateRouteKeysToLocationPath(AppRoute.Portfolio,locale,defaultLanguage,true)}`} />
          <title>{aboutTranslation['head.title']}</title>
          <meta
            name="description"
            content={aboutTranslation['head.description']}
          />
          <meta
            name="keywords"
            content={aboutTranslation['head.keywords']}
          />
          <link rel="stylesheet" href="/css/about.css" />
        </Helmet>
      </HelmetProvider>
      <Breadcrumbs language={locale} defaultLanguage={defaultLanguage} />
      <div className="main__container">
        <h1 className="main__title">{aboutTranslation['title']}</h1>
        <section className="universities">
          <h2
            id={routesTranslation['about']['subpath']['education']['path']}
            className="universities__title"
            ref={ educationRef => refs.current[0] = { 'education': educationRef } }
          >
            {routesTranslation['about']['subpath']['education']['details']['name']}
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
                educationTranslation['utexas']['activities']['values'].map( (activity,index) => (
                  <li key={index} className="university__item">{activity}</li>                    
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
                educationTranslation['usil']['activities']['values'].map( (activity, index) => (
                  <li key={index} className="university__item">{activity}</li>
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
            className="certificates__title"
            ref={ certificatesRef => refs.current[1] = { 'certificates': certificatesRef } }
          >
            {routesTranslation['about']['subpath']['certificates']['details']['name']}
          </h2>
          {
            certificatesTranslation.map( (certificate,index) => (
              <div key={index} className="certificate">
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
                  certificate['data'].map( (data,index) => (
                    <p key={index}>{ data['label'] }: { data['value'] }</p>
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