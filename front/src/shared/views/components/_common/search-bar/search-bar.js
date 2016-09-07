import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

if (process.env.BROWSER) {
  require('./search-bar.scss');
}

class SearchBar extends Component {
  static propTypes = {
    initialValue: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    initialValue: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue
    }
  }
  onChange = evt => {
    this.setState({
      value: evt.target.value,
    }, () => {
      this.props.onChange && this.props.onChange(this.state.value);
    })
  }

  render() {
    return (
      <FormGroup>
        <FormControl value={this.state.value} onChange={this.onChange} type="text" placeholder="Search..." />
      </FormGroup>
    );
  }
}

function stateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(stateToProps)(SearchBar);
