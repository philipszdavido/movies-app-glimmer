/*import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import App from './main';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

app.renderComponent('MoviesApp', containerElement, null);

app.boot();
*/
import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';

const app = new App();
console.log('main routing')
setPropertyDidChange(() => {
  app.scheduleRerender();
});


app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

/* Define your routes */
app.defineRoutes([
  { 
    path: '/', 
    component: 'Movies',
    redirectTo: '//movies'
  },
  { path: '/movies', component: 'Movies' },
  { path: '/tvshows', component: 'Tvshows' }
]);

app.boot();
