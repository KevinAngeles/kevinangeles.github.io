import React from 'react';
import { useLocation } from 'react-router-dom';

import * as analytics from './ga4';

/**
 * Initialize Google Analytics and send page location 
 * every time the location changes.
 */
export const useAnalytics = () => {
  const location = useLocation();
  const path = `${location.pathname}${location.hash}`;

  React.useEffect(() => {
    analytics.init();
  }, [])

  React.useEffect(() => {
    analytics.sendGAPageview(path);
  }, [path])
}

export default useAnalytics;