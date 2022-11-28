import { Language } from "../../../../const";

type AboutEducationStrings = {
  'name': string,
  'location': {
    'label': string,
    'value': string,
  },
  'major': {
    'label': string,
    'value': string,
  },
  'activities': {
    'label': string,
    'values': string[]
  },
  'logo': {
    'source': string,
    'alt': string,
    'title': string,
  },
  'photo': {
    'source': string,
    'alt': string,
    'title': string,
  },
};

type AboutEducationWithMinorStrings = 
  AboutEducationStrings 
    &
  {
    'minor': {
      'label': string,
      'value': string,
    }
  };

type AboutCertificateStrings = {
  'title': string,
  'caption': string,
  'lang': Language,
  'image': {
    'src': string,
    'alt': string,
    'title': string
  },
  'data': {'label': string, 'value': string}[],
}

export type AboutCertificateWithLinkStrings = 
  AboutCertificateStrings
    &
  {
    'link': {
      'url': string,
      'alt': string,
      'title': string
    },
  };

export type AboutStrings = {
  'head.title': string,
  'head.description': string,
  'head.keywords': string,
  'title': string,
  'education': {
    'utexas': AboutEducationWithMinorStrings,
    'usil': AboutEducationStrings,
  },
  'certificates': [
    AboutCertificateStrings,
    AboutCertificateWithLinkStrings,
    AboutCertificateStrings,
    AboutCertificateWithLinkStrings,
  ]
}