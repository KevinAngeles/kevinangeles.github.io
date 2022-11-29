import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageContext } from '../../i18n';
import { Flag, ILanguagePath } from './Flag';
import { Navigation } from './Navigation';
import { translateLocationPathToOtherLanguage } from '../../../utils';
import { availableLocales, ILanguage, translation } from '../../../const';

export const Header = () => {
  const {
    defaultLanguage,
    locale,
  } = useContext(LanguageContext) as ILanguage;

  const location = useLocation();
  const parsedLocation = location.pathname + ((location.hash.length > 0) ? location.hash : '');
  const languagesWithoutDefault: ILanguagePath[] = Object
    .values(availableLocales)
    .filter(language => language !== locale)
    .map(language=> {
      const translatedRoute = translateLocationPathToOtherLanguage(
        parsedLocation,
        locale,
        language,
        defaultLanguage,
      );

      return {
        language,
        translatedRoute
      }
    }
  );

  let homePath = '/';

  if(locale !== defaultLanguage) {
    homePath += `${locale}/`;
  }

  const appTranslation = translation[locale]['app'];
  const [navCollapsed,setNavCollapsed] = useState(true);

  const toggleNavbar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNavCollapsed(!navCollapsed);
  }

  return (
    <header className="header">
      <a href={homePath} className="header__brand" title={appTranslation['brand_link_title']}>
        <h1 className="header__brand-title">
          <span className="header__brand-text">Kevin </span>
          <span className="header__brand-text">Angeles</span>
        </h1>
      </a>
      <div className="header__language">
        {
          languagesWithoutDefault.map( languageObject => (
            <Flag key={languageObject["language"]} {...languageObject}/>
          ))
        }
      </div>
      <button
        className="header__navbar-toggle"
        type="button"
        onClick={(event) => toggleNavbar(event)}
      >
        <span className="header__navbar-sr-only">{appTranslation['sr_only']}</span>
        <span className="header__navbar-toggle-bar"></span>
        <span className="header__navbar-toggle-bar"></span>
        <span className="header__navbar-toggle-bar"></span>
      </button>
      <Navigation locale={locale} defaultLanguage={defaultLanguage} navCollapsed={navCollapsed}/>
    </header>
  );
}