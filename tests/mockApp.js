import React from 'react';

// Mock app component
class MyApp extends React.Component {
  componentDidMount() {
    this.props.send('updateFoo', 'baz');
  }

  render() {
    return <div>Foo is {this.props.foo}</div>;
  }
}

MyApp.propTypes = {
  send: React.PropTypes.func.isRequired,
  foo: React.PropTypes.string.isRequired
};

export default MyApp;
