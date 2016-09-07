import React, { Component } from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./user-item.scss');
}

export default class UserItem extends Component {
  render() {
    const user = this.props.user.toJS();
    return (
      <li className="UserItem">
        <Link to={`/user/${user._id}`}>
          <img src={user.picture.thumbnail} />
          <span>
            {` ${user.name.title}. ${user.name.first} ${user.name.last}`}
          </span>
          <img className="arrow" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-right-128.png" />
        </Link>
      </li>
    );
  }
}
