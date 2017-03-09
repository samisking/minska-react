import React from 'react';

// Mock app component
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.renderCount = 0;
  }

  componentDidMount() {
    this.props.send('updateFoo', 'updated foo');
  }

  updateFoo = (event) => {
    this.props.send('updateFoo', event.data);
  }

  updateBaz = (event) => {
    this.props.send('updateBaz', event.data);
  }

  render() {
    this.renderCount += 1;

    return (
      <div>
        <p className="render-count">{this.renderCount}</p>
        <p>Foo: {this.props.foo}</p>
        <p>Baz: {this.props.baz}</p>
        <button className="update-foo" onClick={this.updateFoo}>Update Foo</button>
        <button className="update-baz" onClick={this.updateBaz}>Update Baz</button>
      </div>
    );
  }
}

MyApp.propTypes = {
  send: React.PropTypes.func.isRequired,
  foo: React.PropTypes.string,
  baz: React.PropTypes.string
};

export default MyApp;
