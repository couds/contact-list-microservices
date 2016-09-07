import { Map, List } from 'immutable';
import reducers from './reducers';
import Actions from './actions'
import ACTIONS from './constants';

export const INITIAL_STATE = Map({
  users: List(),
  userDetail: Map({
    name: Map({
      title: '',
      first: '',
      last: '',
    }),
    username: '',
    email: '',
    cell: '',
    phone: '',
    gender: '',
    picture: Map({
      large: "https://randomuser.me/api/portraits/women/84.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/84.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/84.jpg",
    }),
    dob: new Date().getTime(),
  }),
});

export default {
  Actions,
  reducers,
  ACTIONS,
  INITIAL_STATE,
}
