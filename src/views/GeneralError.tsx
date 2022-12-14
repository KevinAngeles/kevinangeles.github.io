import React from 'react';
import { Link } from 'react-router-dom';
import { appLanguage, AppRoute } from '../const';
import { translateRouteKeysToLocationPath } from '../utils';

export const GeneralError: React.FC = () => (
  <main className="home-main">
    <div className="home-main__container">
      <h1 className="home-main__title">Error 404 Page not found</h1>
      <p className="home-main__description">Please go back to <Link to={translateRouteKeysToLocationPath(AppRoute.Home,appLanguage.English,appLanguage.English)} >Home page</Link></p>
    </div>
  </main>
);