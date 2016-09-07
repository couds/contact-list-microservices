import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Actions } from 'flux';
import SearchBar from 'views/components/_common/search-bar';
import UserItem from './user-item';

if (process.env.BROWSER) {
  require('./user-list.scss');
}

class UserList extends Component {
  static getActions(params = {}, query = {}) {
    const actions = new Actions();
    return [actions.Home.fetchUsers()];
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    }
  }

  componentDidMount() {
    UserList.getActions(this.props.params, this.props.location.query).map(this.props.dispatch);
  }

  onSearch = filter => {
    this.setState({ filter: filter.trim() });
  }

  render() {
    const userList = this.props.users
      .filter(user => {
        if (!this.state.filter) {
          return true;
        }
        const name = user.get('name').toJS();
        if (`${name.title} ${name.first} ${name.last}`.indexOf(this.state.filter) !== -1) {
          return true
        }
        return false;
      })
      .map((user, i) => (<UserItem key={i} user={user} />));
    return (
      <div className="UserList">
        <SearchBar onChange={this.onSearch} />
        <ul className="list">
          {userList}
        </ul>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    users: state.get('home').get('users'),
  };
}

export default connect(stateToProps)(UserList);
