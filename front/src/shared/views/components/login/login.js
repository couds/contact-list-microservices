import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

import { Actions } from 'flux';

if (process.env.BROWSER) {
  require('./login.scss');
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
      },
    };
  }

  onFormChange = field => evt => {
    const { form } = this.state;
    form[field] = evt.target.value;
    this.setState({ form });
  }

  disableButton = () => (
    !this.state.form.username || !this.state.form.password
  )

  login = () => {
    this.props.dispatch(new Actions().User.login(this.state.form))
      .then(() => {
        console.log('Login');
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="Login flexbox">
        <div className="box">
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl value={this.state.form.username} onChange={this.onFormChange('username')} type="text" placeholder="Admin" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl value={this.state.form.password} onChange={this.onFormChange('password')} type="password" placeholder="123456" />
          </FormGroup>
          <FormGroup>
            <Button bsStyle="primary" className="pull-right" disabled={this.disableButton()} onClick={this.login} >Login</Button>
          </FormGroup>
        </div>
      </div>
    );
  }
}

function stateToProps(state) {
  return {};
}

export default connect(stateToProps)(Login);
