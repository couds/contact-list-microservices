import ACTION from '../constants';
import userRepository from 'repositories/users';

export default class HomeActions {
  fetchUsers() {
    return {
      type: ACTION.FETCH_USERS,
      payload: userRepository.getAllUsers(),
    };
  }

  fetchUser(id) {
    return {
      type: ACTION.FETCH_USER,
      payload: userRepository.getUser(id),
    };
  }

  updateUser(user) {
    return {
      type: ACTION.FETCH_USER,
      payload: userRepository.updateUser(user),
    };
  }

  deleteUser(id) {
    return {
      type: ACTION.DELETE_USER,
      payload: userRepository.deleteUser(id)
        .then(() => Promise.resolve(id)),
    };
  }

  cleanUser() {
    return {
      type: ACTION.CLEAN_CURRENT,
    }
  }


  createUser(user) {
    return {
      type: ACTION.CREATE_USER,
      payload: userRepository.createUser(user),

    }
  }
}
