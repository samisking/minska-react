import React from 'react';

class Provider extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    store: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    store: React.PropTypes.object
  };

  state = {
    store: this.props.store
  };

  getChildContext() {
    return {
      store: this.state.store
    };
  }

  render() {
    return (
      this.props.children
    );
  }
}

export default Provider;
