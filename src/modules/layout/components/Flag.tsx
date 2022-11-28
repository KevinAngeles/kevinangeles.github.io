import React from 'react';
import { Link } from 'react-router-dom';
import { Language, translation } from '../../../const';

export interface ILanguagePath {
  language: Language,
  translatedRoute: string,
}

export const Flag: React.FC<ILanguagePath> = ({ language, translatedRoute }) => {
  const appTranslation = translation[language]['app'];

  return (
    <Link
      to={translatedRoute}
      title={appTranslation['flags'][language]['flag_link_title']}
      className="header__language-link"
    >
      <figure className="header__language-container">
        <img
          src={appTranslation['flags'][language]['flag_src']}
          alt={appTranslation['flags'][language]['flag_image_alt']}
          className="header__language-flag"
        />
        <figcaption
          className="header__language-name"
          lang={language}
        >
          {appTranslation['flags'][language]['native_language']}
        </figcaption>
      </figure>
    </Link>
  );
};