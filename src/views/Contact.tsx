import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageContext } from '../modules/i18n';
import { AppRoute, ILanguage, translation } from '../const';
import { translateRouteKeysToLocationPath } from '../utils';
import { Breadcrumbs } from '../modules/layout/components/Breadcrumbs';
import { MapContainer, TileLayer } from 'react-leaflet';

export const Contact: React.FC = () => {
  const {
    locale,
    defaultLanguage
  } = useContext(LanguageContext) as ILanguage;

  const contactTranslation = translation[locale]['contact'];

  return (
    <main className="main">
      <HelmetProvider>
        <Helmet>
          <link rel="prev" href={`/#${translateRouteKeysToLocationPath(AppRoute.Portfolio,locale,defaultLanguage,true)}`} />
          <title>{contactTranslation['head.title']}</title>
          <meta
            name="description"
            content={contactTranslation['head.description']}
          />
          <meta
            name="keywords"
            content={contactTranslation['head.keywords']}
          />
          <link rel="stylesheet" href="/css/leaflet.css" />
          <link rel="stylesheet" href="/css/contact.css" />
        </Helmet>
      </HelmetProvider>
      <Breadcrumbs language={locale} defaultLanguage={defaultLanguage} />
      <div className="main__container">
        <h1 className="main__title">{contactTranslation['title']}</h1>
        <section
          className="info"
          itemScope
          itemType="http://schema.org/Person"
        >
          <h2 className="info__title">{contactTranslation['contact']['label']}</h2>
          <div className="info__name" itemProp="name">
            <strong>{contactTranslation['contact']['name']}</strong>
          </div>
          <div className="info__job" itemProp="jobtitle">{contactTranslation['contact']['job_title']}</div>
          <div
            className="info__address"
            itemProp="homeLocation address"
            itemScope
            itemType="http://schema.org/PostalAddress"
          >
            <div className="info__locality" itemProp="addressLocality">
              {contactTranslation['contact']['address']['city']}
            </div>
            <div className="info__region">
              <span itemProp="addressRegion">{contactTranslation['contact']['address']['state']}</span>
              <span itemProp="postalCode">{contactTranslation['contact']['address']['postalcode']}</span>
            </div>
            <div className="info__country" itemProp="addressCountry">
              {contactTranslation['contact']['address']['country']}
            </div>
          </div>
          <div className="info__social">
            {contactTranslation['contact']['versioncontrol']['label']}:
            <a
              className="info__social-link"
              href={contactTranslation['contact']['versioncontrol']['url']}
            >
              {contactTranslation['contact']['versioncontrol']['description']}
            </a>
          </div>
          <div className="info__social">
            {contactTranslation['contact']['social']['linkedin']['label']}:
            <a
              className="info__social-link"
              href={contactTranslation['contact']['social']['linkedin']['url']}
            >
              {contactTranslation['contact']['social']['linkedin']['description']}
            </a>
            </div>
        </section>
        <section className="map">
          <h2 className="map__title">{contactTranslation['map']['title']}</h2>
          <div id="map-canvas" className="map__canvas">
            <MapContainer center={[30.285934, -97.739446]} zoom={17} scrollWheelZoom={true}>
              <TileLayer
                attribution='Austin, TX'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </section>
      </div>
    </main>
  );
};