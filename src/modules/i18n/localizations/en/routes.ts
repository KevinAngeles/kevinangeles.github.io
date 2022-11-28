import { RouteStrings } from "../localizationTypes/RouteStrings";
import { projects } from "./projects";

export const routes: RouteStrings = {
  'home': {
    'path': '/',
    'details': {
      'title': 'Go to home page',
      'name': 'home',
    }
  },
  'about': {
    'path': 'about',
    'details': {
      'title': 'Go to about page',
      'name': 'about',
    },
    'subpath': {
      'education': {
        'path': 'education',
        'details': {
          'title': 'Go to education page',
          'name': 'education',
        }
      },
      'certificates':{
        'path': 'certificates',
        'details': {
          'title': 'Go to certificates page',
          'name': 'certificates',
        }
      }
    }
  },
  'contact': {
    'path': 'contact',
    'details': {
      'title': 'Go to contact page',
      'name': 'contact',
    },
  },
  'portfolio': {
    'path': 'portfolio',
    'details': {
      'title': 'Go to portfolio page',
      'name': 'portfolio',
    },
    'subpath' : projects,
  }
};