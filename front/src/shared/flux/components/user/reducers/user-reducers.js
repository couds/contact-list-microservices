import ACTION from '../constants';
import { fromJS, Map } from 'immutable';

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ACTION.LOGIN:
      return fromJS(action.payload);
    case ACTION.LOGOUT:
      return Map({});
    default:
      return state;
  }
}
