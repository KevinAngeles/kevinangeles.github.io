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
    <main className="contact-main">
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
        </Helmet>
      </HelmetProvider>
      <Breadcrumbs language={locale} defaultLanguage={defaultLanguage} />
      <div className="contact-main__container">
        <h1 className="contact-main__title">{contactTranslation['title']}</h1>
        <section
          className="contact-info"
          itemScope
          itemType="http://schema.org/Person"
        >
          <h2 className="contact-info__title">{contactTranslation['contact']['label']}</h2>
          <div className="contact-info__name" itemProp="name">
            <strong>{contactTranslation['contact']['name']}</strong>
          </div>
          <div className="contact-info__job" itemProp="jobtitle">{contactTranslation['contact']['job_title']}</div>
          <div
            className="contact-info__address"
            itemProp="homeLocation address"
            itemScope
            itemType="http://schema.org/PostalAddress"
          >
            <div className="contact-info__locality" itemProp="addressLocality">
              {contactTranslation['contact']['address']['city']}
            </div>
            <div className="contact-info__region">
              <span itemProp="addressRegion">{contactTranslation['contact']['address']['state']}</span>
              <span itemProp="postalCode">{contactTranslation['contact']['address']['postalcode']}</span>
            </div>
            <div className="contact-info__country" itemProp="addressCountry">
              {contactTranslation['contact']['address']['country']}
            </div>
          </div>
          <div className="contact-info__social">
            {contactTranslation['contact']['versioncontrol']['label']}:
            <a
              className="contact-info__social-link"
              href={contactTranslation['contact']['versioncontrol']['url']}
            >
              {contactTranslation['contact']['versioncontrol']['description']}
            </a>
          </div>
          <div className="contact-info__social">
            {contactTranslation['contact']['social']['linkedin']['label']}:
            <a
              className="contact-info__social-link"
              href={contactTranslation['contact']['social']['linkedin']['url']}
            >
              {contactTranslation['contact']['social']['linkedin']['description']}
            </a>
            </div>
        </section>
        <section className="contact-map">
          <h2 className="contact-map__title">{contactTranslation['map']['title']}</h2>
          <div id="contact-map-canvas" className="contact-map__canvas">
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