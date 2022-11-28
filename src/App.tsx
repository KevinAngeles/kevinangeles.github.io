import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppRoute, appLanguage } from './const';
import * as views from './views';
import 'normalize.css';
import 'typeface-open-sans';
import { AppLayout } from './modules/layout';
import { LocalizedRouter, LocalizedSwitch } from './modules/i18n';

export const App: React.FC = () => (
  <LocalizedRouter
    RouterComponent={BrowserRouter}
    defaultLanguage={appLanguage.English}
  >
    <AppLayout>
      <LocalizedSwitch>
        <Route path={AppRoute.Home} element={<views.Home/>}/>
        <Route path={AppRoute.About} element={<views.About/>}/>
        <Route path={AppRoute.Portfolio} element={<views.Portfolio/>}/>
        <Route path={AppRoute.Contact} element={<views.Contact/>}/>
        <Route path="*" element={<views.GeneralError />}/>
      </LocalizedSwitch>
    </AppLayout>
  </LocalizedRouter>
);