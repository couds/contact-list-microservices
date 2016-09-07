import ACTION from '../constants';
import { fromJS } from 'immutable';
import { INITIAL_STATE } from '../flux-components-home'

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ACTION.FETCH_USERS:
      return state.set('users', fromJS(action.payload));
    case ACTION.CREATE_USER:
      return state.update('users', users => users.push(fromJS(action.payload)));
    case ACTION.DELETE_USER:
      return state.update('users', users => users.filter(user => user.get('_id') !== action.payload));
    case ACTION.FETCH_USER:
    case ACTION.UPDATE_USER:
      return state.set('userDetail', fromJS(action.payload));
    case ACTION.CLEAN_CURRENT:
      return state.set('userDetail', INITIAL_STATE.get('userDetail'));
    default:
      return state;
  }
}
