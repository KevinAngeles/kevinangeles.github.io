export type ProjectDetailsStrings = {
  'id': string,
  'name': string,
  'image.src': string,
  'image.title': string,
  'image.alt': string,
  'description.label': string,
  'description.text': string,
  'code.label': string,
  'code.link': string,
  'code.description': string,
  'demo.label': string,
  'demo.link': string,
  'demo.description': string,
  'technology.label': string,
  'technology.items': string[],
  'navigation.title': string,
}

export type ProjectStrings = {
  'xlsx': {
    'path': string,
    'details': ProjectDetailsStrings,
  },
  'algovisual': {
    'path': string,
    'details': ProjectDetailsStrings,
  }
}