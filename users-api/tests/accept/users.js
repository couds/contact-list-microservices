var logger = require('winston');
var server = require('app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('seed/seed');
var User = require('models/user').default;
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';


describe('Users', function() {

  // Before our test suite
  before(function(done) {
    // Start our app on an alternative port for acceptance tests
    server.listen(8001, function() {
      logger.info('Listening at http://localhost:8001 for acceptance tests');
      // Seed the DB with our users
      seed(done);
    });
  });

  describe('/GET users', function() {
    it('should return a list of users', function(done) {
      chai.request(url)
        .get('/users')
        .then(function(res) {
          res.body.should.be.a('array');
          res.should.have.status(200);
          res.body.length.should.be.eql(100);
          return done();
        })
        .catch(done);
    });
  });

  describe('/GET users/:id', function() {
    it('should return a single user', function(done) {
      // Find a user in the DB
      User.findOne({})
        .then(function(user) {
          var id = user._id;
          // Read this user by id
          return chai.request(url)
            .get('/users/' + id);
        })
        .then(function(res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.name.first).to.be.a('string');
          done();
        })
        .catch(done);
    });
  });

  describe('/Put users/:id', function() {
    it('should update a single user and return it', function(done) {
      var updatedUser = {};
      // Find a user in the DB
      User.findOne({})
        .then(function(user) {
          var id = user._id;
          updatedUser = Object.assign({}, user.toJSON(), { username: `${user.username} test`})
          // Update this user by id
          return chai.request(url)
            .put('/users/' + id)
            .send(updatedUser);
        })
        .then(function(res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.username).to.be.equal(updatedUser.username);
          done();
        })
        .catch(done);
    });
  });

  describe('/DELETE users/:id', function() {
    it('should delete a single user', function(done) {
      // Find a user in the DB
      var id = null;
      User.findOne({})
        .then(function(user) {
          id = user._id;
          // Delete this user by id
          return chai.request(url)
            .delete('/users/' + id);
        })
        .then(function(res) {
          res.should.have.status(204);
          // search for user deleted
          return User.findOne({ _id: id });
        })
        .then(function(user) {
          expect(user).to.be.null;
          done();
        })
        .catch(done);
    });
  });


  describe('/POST users', function() {
    it('should create a new user and return it', function(done) {
      const user = {
        gender: 'male',
        name: {
          title: 'mr',
          first: 'joey',
          last: 'austin'
        },
        location: {
          street: '9242 george street',
          city: 'bristol',
          state: 'rutland',
          postcode: 'JO59 9PT'
        },
        email: 'joey.austin@example.com',
        username: 'goldensnake334',
        password: 'pokemon',
        salt: 'hzA1QLQB',
        md5: '96cf290626805557ce40f2d2ca91d7a6',
        sha1: '14439cac870f44c4b658f1862295debe242890da',
        sha256: '952292c4f125c508aa2dc877926f4a67283505327c9593633fee48a804e217cf',
        dob: new Date('1955-11-05 19:29:55').getTime(),
        registered: new Date('2016-05-08 09:52:26').getTime(),
        phone: '016973 20723',
        cell: '0754-267-694',
        picture: {
          large: 'https://randomuser.me/api/portraits/men/22.jpg',
          medium: 'https://randomuser.me/api/portraits/med/men/22.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/men/22.jpg'
        },
      }
      chai.request(url)
        .post('/users/')
        .send(user)
        .then(function(res) {
          res.should.have.status(201);
          //Check if user returned exist
          return User.findOne({
            _id: res.body._id,
          });
        })
        .then(function(newUser) {
          expect(newUser).not.to.be.null;
          expect(newUser).to.be.a('object');
          expect(newUser.username).to.be.equal(user.username);
          done();
        })
        .catch(done)
    });
  });
});
