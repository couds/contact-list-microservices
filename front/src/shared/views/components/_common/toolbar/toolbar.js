import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./toolbar.scss');
}

class Toolbar extends Component {
  render() {
    return (
      <div className="Toolbar">
        <Link to="/" >
          <img src="https://randomuser.me/api/portraits/women/68.jpg" />
        </Link>

        <h1>Contact List</h1>
        <Link to="/user/new" className="button btn-primary btn" >Create</Link>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(stateToProps)(Toolbar);
