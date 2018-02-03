import Component from '@glimmer/component';
import getRouter from '../../../utils/get-router';

export default class MoviesApp extends Component {
linkTo() {
    return getRouter(this).transitionTo('/emails/compose');
  }

  linkToDynamic() {
    return getRouter(this).transitionTo('/emails/1234');
  }

  linkToDynamicFoo() {
    return getRouter(this).transitionTo('/emails/foo-bar-baz');
  }

  linkToEmail() {
    return getRouter(this).transitionTo('/emails');
  }

  linkToMovies() {
      return getRouter(this).transitionTo('/movies');  
  }

  linkToTvshows() {
      return getRouter(this).transitionTo('/tvshows');      
  }
}
