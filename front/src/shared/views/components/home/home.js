import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from 'views/components/_common/toolbar';
import NotificationSystem from 'react-notification-system';

if (process.env.BROWSER) {
  require('./home.scss');
}

class Home extends Component {
  static childContextTypes = {
    notification: React.PropTypes.object,
  }

  getChildContext() {
    return {
      notification: {
        add: ({ message, level = 'success' }) => {
          this.refs.notificationSystem.addNotification({
            message,
            level,
          })
        },
      },
    };
  }

  render() {
    return (
      <div className="Home">
        <Toolbar />
        <div className="content">
          {this.props.children}
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

function stateToProps(state) {
  return {
  };
}

export default connect(stateToProps)(Home);
