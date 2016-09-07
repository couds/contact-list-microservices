import { Map, List } from 'immutable';
import Home from 'flux/components/home';
import User from 'flux/components/user';

export const INITIAL_STATE = Map({
  home: Home.INITIAL_STATE,
  user: User.INITIAL_STATE,
});

export class Actions {
  get Home() {
    return new Home.Actions();
  }
  get User() {
    return new User.Actions();
  }
}

export function reducers(previousState, action) {
  return previousState
    .update('home', state => Home.reducers(state, action))
    .update('user', state => User.reducers(state, action));
}
