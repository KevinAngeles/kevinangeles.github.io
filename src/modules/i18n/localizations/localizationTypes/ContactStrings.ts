export type ContactStrings = {
  'head.title': string,
  'head.description': string,
  'head.keywords': string,
  'title': string,
  'contact': {
    'name': string,
    'label': string,
    'job_title': string,
    'address': {
      'road': string,
      'city': string,
      'state': string,
      'postalcode': string,
      'country': string,
    },
    'versioncontrol': {
      'label': string,
      'url': string,
      'description': string,
    },
    'social': {
      'linkedin': {
        'label': string,
        'url': string,
        'description': string,
      },
    },
  },
  'map': {
    'title': string,
  },
}