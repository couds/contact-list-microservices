if (typeof require.ensure !== 'function') { require.ensure = (d, c) => { c(require); }; }

if (typeof require.include !== 'function') { require.include = () => {}; }


export default function getRoutes(state) {
  return [
    {
      path: '/',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('views/components/home').default);
        });
      },
      getIndexRoute: (location, cb) => {
        require.ensure([], require => {
          cb(null, {
            component: require('views/components/home/user-list').default,
          });
        });
      },
      childRoutes: [
        {
          path: 'user/new',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('views/components/home/user-details').default);
            });
          },
        },
        {
          path: 'user/:id',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('views/components/home/user-details').default);
            });
          },
        },
      ]
    },
    {
      path: '/login',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('views/components/login').default);
        });
      },
    },
  ];
}
