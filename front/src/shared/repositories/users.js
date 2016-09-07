import resful from './drivers/restful';

export default {
  getAllUsers() {
    return resful.get({
      endpoint: 'users',
    });
  },
  getUser(id) {
    return resful.get({
      endpoint: `users/${id}`,
    });
  },
  updateUser(user) {
    return resful.put({
      endpoint: `users/${user._id}`,
      params: user,
    });
  },
  deleteUser(id) {
    return resful.delete({
      endpoint: `users/${id}`,
    });
  },
  createUser(user) {
    return resful.post({
      endpoint: `users`,
      params: user,
    });
  }
}
