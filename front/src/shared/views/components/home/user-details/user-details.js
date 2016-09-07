import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'flux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';


import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

if (process.env.BROWSER) {
  require('./user-details.scss');
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class UserDetails extends Component {
  static getActions(params = {}, query = {}) {
    const actions = new Actions();
    return params.id ? [actions.Home.fetchUser(params.id)] : [actions.Home.cleanUser()];
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    notification: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      form: this.props.user.toJS(),
      showConfirmation: false,
    }
  }

  componentDidMount() {
    UserDetails.getActions(this.props.params, this.props.location.query).map(this.props.dispatch);
  }

  componentWillReceiveProps(props) {
    this.setState({ form: props.user.toJS() });
    if (!props.params.id) {
      UserDetails.getActions(this.props.params, this.props.location.query).map(this.props.dispatch);
    }
  }

  onChangeName = field => evt => {
    const { form } = this.state;
    form.name[field] = evt.target.value;
    this.setState({ form });
  }

  onChangeForm = field => evt => {
    const { form } = this.state;
    form[field] = evt.target.value;
    this.setState({ form });
  }

  onChangeDate = field => evt => {
    const { form } = this.state;
    form[field] = new Date(evt.target.value).getTime();
    this.setState({ form });
  }

  modal = showConfirmation => () => {
    this.setState({ showConfirmation });
  }

  save = evt => {
    this.setState({
      loading: true,
    });
    this.props.dispatch(this.props.params.id ? new Actions().Home.updateUser(this.state.form) : new Actions().Home.createUser(this.state.form))
      .then(() => {
        this.context.notification.add({
          message: 'User Updated',
        });
        this.context.router.push('/');
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
        this.context.notification.add({
          message: 'Could not update the user. Please try later',
          level: 'error',
        });
      })
  }

  deleteUser = () => {
    this.setState({
      loading: true,
    });
    this.props.dispatch(new Actions().Home.deleteUser(this.props.params.id))
      .then(() => {
        this.context.notification.add({
          message: 'User deleted',
        });
        this.context.router.push('/');
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
        this.context.notification.add({
          message: 'Could not delete the user. Please try later',
          level: 'error',
        });
      })
  }

  render() {
    const user = this.state.form;
    if (!!this.props.params.id && user._id !== this.props.params.id) {
      return <div>Loading</div>;
    }
    return (
      <Col md={8} mdOffset={2} className="UserDetails">
        <Row>
          <Col md={3}>
            <div className="avatarWrapper">
              <img className="avatar" src={user.picture.large} />
            </div>
          </Col>
          <Col md={9} >
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Title"
              placeholder="Title (Ms, Mr...)"
              value={user.name.title}
              onChange={this.onChangeName('title')}
              />

            <FieldGroup
              id="formControlsText"
              type="text"
              label="First Name"
              placeholder="First Name"
              value={user.name.first}
              onChange={this.onChangeName('first')}
              />

            <FieldGroup
              id="formControlsText"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              value={user.name.last}
              onChange={this.onChangeName('last')}
              />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Username"
              placeholder="john.doe"
              value={user.username}
              onChange={this.onChangeForm('username')}
              />
            <FieldGroup
              id="formControlsText"
              type="date"
              label="Day of Bird"
              placeholder="XX/XX/XXXX"
              value={moment(new Date(user.dob)).format('YYYY-MM-DD')}
              onChange={this.onChangeDate('dob')}
              />
            <FieldGroup
              id="formControlsText"
              type="email"
              label="Email"
              placeholder="john.doe@redhat.com"
              value={user.email}
              onChange={this.onChangeForm('email')}
              />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Gender"
              placeholder="Female"
              value={user.gender}
              onChange={this.onChangeForm('gender')}
              />
            <FieldGroup
              id="formControlsText"
              type="phone"
              label="Cellphone"
              placeholder="XXX-XX-XX-XX "
              value={user.cell}
              onChange={this.onChangeForm('cell')}
              />
            <FieldGroup
              id="formControlsText"
              type="phone"
              label="Phone"
              placeholder="XXX-XX-XX-XX "
              value={user.phone}
              onChange={this.onChangeForm('phone')}
              />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button bsStyle="primary" disabled={this.state.loading} className="pull-right"  onClick={this.save} >Save</Button>
            {
              this.props.params.id && <Button bsStyle="danger" disabled={this.state.loading} className="pull-left"  onClick={this.modal(true)} >Delete</Button>
            }
          </Col>
        </Row>
        <Modal show={this.state.showConfirmation} onHide={this.modal(false)}>
          <Modal.Header>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            You want to delete this user? {`${user.name.first} ${user.name.last}`}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.modal(false)}>Close</Button>
            <Button bsStyle="danger" onClick={this.deleteUser}>Yes! Delete it.</Button>
          </Modal.Footer>

        </Modal>
      </Col>
    );
  }
}

function stateToProps(state) {
  return {
    user: state.get('home').get('userDetail'),
  };
}

export default connect(stateToProps)(UserDetails);
