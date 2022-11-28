import { RouteStrings } from "../localizationTypes/RouteStrings";
import { projects } from "./projects";

export const routes: RouteStrings = {
  'home': {
    'path': '/',
    'details': {
      'title': 'Ir a la página de inicio',
      'name': 'inicio',
    }
  },
  'about': {
    'path': 'acerca',
    'details': {
      'title': 'Ir a la página acerca de mí',
      'name': 'acerca de mí',
    },
    'subpath': {
      'education': {
        'path': 'educacion',
        'details': {
          'title': 'Ir a la sección de mi educación',
          'name': 'educación',
        },
      },
      'certificates':{
        'path': 'certificados',
        'details': {
          'title': 'Ir a la sección de mis certificados',
          'name': 'certificados',
        }
      }
    }
  },
  'contact': {
    'path': 'contacto',
    'details': {
      'title': 'Ir a la página de contacto',
      'name': 'contacto',
    }
  },
  'portfolio': {
    'path': 'portafolio',
    'details': {
      'title': 'Ir a la página de portafolio',
      'name': 'portafolio',
    },
    'subpath' : projects,
  }
};