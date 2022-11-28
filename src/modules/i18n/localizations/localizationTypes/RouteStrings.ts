import { ProjectDetailsStrings, ProjectStrings } from "./ProjectStrings"

export interface IPathStrings {
  [k:string]: {
    'path': string,
    'details': ({
      'title': string,
      'name': string,
    }|ProjectDetailsStrings),
    'subpath'?: IPathStrings
  }
}

export type RouteStrings = {
  'home': {
    'path': string,
    'details': {
      'title': string,
      'name': string,
    },
  },
  'about': {
    'path': string,
    'details': {
      'title': string,
      'name': string,
    },
    'subpath':{
      'education': {
        'path': string,
        'details': {
          'title': string,
          'name': string,
        }
      },
      'certificates':{
        'path': string,
        'details': {
          'title': string,
          'name': string,
        }
      }
    }
  },
  'contact': {
    'path': string,
    'details': {
      'title': string,
      'name': string,
    }
  },
  'portfolio': {
    'path': string,
    'details': {
      'title': string,
      'name': string,
    },
    'subpath': ProjectStrings,
  }
}