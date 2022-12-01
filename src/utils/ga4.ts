import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-MMX827HFQS';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Initialize Google Analytics.
 */
export const init = () => {
  try {
    ReactGA.initialize(TRACKING_ID, { 
      testMode: !isProduction 
    });
  } catch (error) {
    console.log(`There was an error initializing google analytics ${error}`);
  }
};

interface IGAEvent {
  category: string;
  action?: string;
  label?: string;
}

/**
 * Send Google Analytics events.
 * 
 * @params {string} category
 * @params {string} [action] - (optional)
 * @params {string} [label] - (optional)
 */
export const sendGAEvent = (
  category: string,
  action?: string,
  label?: string
) => {
  try {
    const gaObject = {} as IGAEvent;
    gaObject['category'] = category;
    if(typeof action === 'string') {
      gaObject['action'] = action;
    }
    if(typeof label === 'string') {
      gaObject['label'] = label;
    }
    ReactGA.event('screen_view', gaObject);
  } catch (error) {
    console.log(`There was an error sending event to google analytics ${error}`);
  }
};

/**
 * Send Page location to Google Analytics.
 * 
 * @params {path} category
 */
export const sendGAPageview = (path: string) => {
  try {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path 
    });
  } catch (error) {
    console.log(`There was an error sending page view to google analytics ${error}`);
  }
};