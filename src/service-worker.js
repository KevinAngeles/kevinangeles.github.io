/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute([
  {'revision':null,'url':'/css/leaflet.css'},
  {'revision':null,'url':'/css/style.css'},
  {'revision':null,'url':'/images/flags/english-flag-small.gif'},
  {'revision':null,'url':'/images/flags/spanish-flag-small.gif'},
  {'revision':null,'url':'/images/universities/usil.jpg'},
  {'revision':null,'url':'/images/universities/usil_banner.jpg'},
  {'revision':null,'url':'/images/universities/usil_logo.png'},
  {'revision':null,'url':'/images/universities/utexas.jpg'},
  {'revision':null,'url':'/images/universities/utexas_logo.png'},
  {'revision':null,'url':'/images/universities/utexas_logo02.jpg'},
  {'revision':null,'url':'/images/slider/slide1.jpg'},
  {'revision':null,'url':'/images/icons/icon1.png'},
  {'revision':null,'url':'/images/icons/icon2.png'},
  {'revision':null,'url':'/images/icons/icon3.png'},
  {'revision':null,'url':'/images/featured_works/bridgesaustin.jpg'},
  {'revision':null,'url':'/images/featured_works/createdby.jpg'},
  {'revision':null,'url':'/images/featured_works/hangman.jpg'},
  {'revision':null,'url':'/images/featured_works/linass.jpg'},
  {'revision':null,'url':'/images/featured_works/nytredux.jpg'},
  {'revision':null,'url':'/images/featured_works/spotxlsx.jpg'},
  {'revision':null,'url':'/images/certificates/microsoft_logo.png'},
  {'revision':null,'url':'/images/certificates/mcp_logo.jpg'},
  {'revision':null,'url':'/images/certificates/mos_excel.png'},
  {'revision':null,'url':'/images/certificates/mos_powerpoint.png'},
  {'revision':null,'url':'/images/certificates/mos_word.png'},
  {'revision':null,'url':'/images/certificates/ms_proghtml5.png'},
  {'revision':null,'url':'/images/certificates/platzi_logo.png'},
  ...self.__WB_MANIFEST
]);

const handler = createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html');
const navigationRoute = new NavigationRoute(handler, {
  allowlist: [
    /^\/$/,
  ],
  denylist: [],
});
registerRoute(navigationRoute);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.match(/.(png|gif|jpg|svg)$/), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
