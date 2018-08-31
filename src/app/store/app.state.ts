import { State, Action, StateContext } from '@ngxs/store';
import { SignUpSuccessful } from '../sign-up/store/sign-up.action';
import { User } from '../models/user';
​


export interface AppStateModel {
  user: User;
  loggedIn: boolean;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    user: {
      name: '',
      username: '',
      password: '',
      location: '',
      age: -1,
    },
    loggedIn: false,

  }
})
export class AppState {
  @Action(SignUpSuccessful)
  SignUpSuccessful(context: StateContext<AppStateModel>, action: SignUpSuccessful) {
    const state = context.getState();
    context.setState({
      user: {...action.user },
      loggedIn: true
    });
  }

}
