import ACTION from '../constants';

export default class HomeActions {
  login(credentials) {
    return {
      type: ACTION.LOGIN,
      payload: new Promise((resolve, reject) => {
        if (credentials.username === 'admin' && credentials.password === '123456') {
          return setTimeout(() => {
            resolve({
              id: 1,
              name: 'Admin',
            })
          }, 1000);
        }
        const err = new Error('Incorrect user or password');
        err.code = 401;
        reject(err);
      }),
    };
  }
  logout() {
    return {
      type: ACTION.LOGOUT,
      payload: new Promise((resolve) => {
        return setTimeout(() => {
          resolve()
        }, 500);
      }),
    }
  }
}
