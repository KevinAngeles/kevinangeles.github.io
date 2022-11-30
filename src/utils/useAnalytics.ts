import React from 'react';
import { useLocation } from 'react-router-dom';

import * as analytics from './ga4';

/**
 * Initialize Google Analytics and send page location 
 * every time the location changes.
 */
export const useAnalytics = () => {
  const location = useLocation();

  React.useEffect(() => {
    analytics.init();
  }, [])

  React.useEffect(() => {
    const path = `${location.pathname}${location.hash}`;
    analytics.sendGAPageview(path);
  }, [location])
}

export default useAnalytics;