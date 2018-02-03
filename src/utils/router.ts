import RouteRecognizer from 'route-recognizer';
//import * as pathToRegexp_ from 'path-to-regexp';
import Application from '@glimmer/application';
import { pathToRegexp } from './path-to-regexp';

function highjack(type) {
  const original = history[type];
  return function () {
    const returnValue = original.apply(this, arguments);
    window.dispatchEvent(new Event(type));
    return returnValue;
  };
};

class RouteRecognizer1 extends RouteRecognizer {
  constructor() {
    super()    
  }
}

export default class Router {
  app: Application;
  router: RouteRecognizer1;
  routes: Array<any>

  constructor(app) {
    this.app = app;
    this.initRoutes()
    this.router = new RouteRecognizer1();
    history.pushState = highjack('pushState'); // TODO: add replaceState
    window.onpopstate = () => this.urlChangeHandler.call(this);
    window.addEventListener('pushState', () => this.urlChangeHandler.call(this));
  }

  initRoutes () {
    if(!this.routes)
      this.routes = []
  }

  add(route) {
    this.router.add([route]);
    this.routes.push(route)
  }

  urlChangeHandler() {
    // First, render the root component
    // query for the data-outlet
    // render the component match in the data-outlet  

    const pathname = window.location.pathname;
    //const results = this.router.recognize(pathname);
    let results = null
    var keys = []
    let routeMatch = null
    for (var i = 0; i <= this.routes.length-1; i++) {
      console.log(this.routes[i])
      results = pathToRegexp(this.routes[i].path, keys, {}).exec(pathname)
      console.log(results)
      console.log('......\n')
      if(results != null){
        routeMatch = this.routes[i]
        break;
      }
    }

    if(pathname == '/') {
      this.app.renderComponent('MoviesApp', document.getElementById('app'), null);
      this.app._render();
    }

    let yieldSections = document.querySelectorAll('[data-outlet]');

    if(yieldSections.length == 0) {
      console.log('yielding')
      this.app.renderComponent('MoviesApp', document.getElementById('app'), null);
      this.app._render();
      yieldSections = document.querySelectorAll('[data-outlet]');
    }      
    console.log(pathname)
    console.log(yieldSections)

    //const componentName = results[0].handler();
    const componentName = routeMatch.component;

    console.log('componentName: ' + componentName)
    const nestedLevel = window.location.pathname.substr(1).split('/');
    console.log(nestedLevel)
    //const containerElement = (yieldSections.length > 0 && pathname !== '/') ? yieldSections[nestedLevel.length - 1] : document.getElementById('app');
    const containerElement = yieldSections[nestedLevel.length - 1];
    console.log(containerElement)

    containerElement.innerHTML = '';

    console.log(yieldSections[nestedLevel.length - 1])
    this.app.renderComponent(componentName, containerElement, null);
  }

  transitionTo(pathname: string, state = {}) {
    const results = this.router.recognize(pathname);
    state = Object.assign({}, state, results[0].params);
    window.history.pushState(state, '', pathname);
  }

  params() {
    return window.history.state;
  }

}