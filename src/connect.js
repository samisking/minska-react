import React from 'react';

const defaultMapStateToProps = state => (state);

const Connect = (
  mapStateToProps = defaultMapStateToProps
) => WrappedComponent => class extends React.PureComponent {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context);

    this.storeKey = `connect:_${Math.random().toString(36).substr(2, 9)}`;
    this.onUpdate = this.onUpdate.bind(this);
    this.send = this.send.bind(this);

    const store = context.store;

    if (!store) {
      throw new Error('Store could not be found in connected component. Make sure to wrap your ' +
                      'root component in <Provider> with a store prop.');
    }

    this.state = {
      ...context.store.state
    };
  }

  componentWillMount() {
    this.context.store.subscribe('onChange', this.storeKey, this.onUpdate);
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.storeKey);
  }

  onUpdate(state) {
    this.setState(state);
  }

  send(...args) {
    this.context.store.send(...args);
  }

  render() {
    const stateToProps = mapStateToProps(this.state, this.props);

    return (
      <WrappedComponent
        {...this.props}
        {...stateToProps}
        send={this.send}
      />
    );
  }
};

export default Connect;
