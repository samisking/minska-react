import React from 'react';

const defaultMapStateToProps = state => (state);

const storeShape = {
  send: React.PropTypes.func.isRequired,
  subscribe: React.PropTypes.func.isRequired,
  unsubscribe: React.PropTypes.func.isRequired
};

const Connect = (
  mapStateToProps = defaultMapStateToProps
) => WrappedComponent => class extends React.PureComponent {
  static contextTypes = {
    store: React.PropTypes.shape(storeShape)
  }

  static propTypes = {
    store: React.PropTypes.shape(storeShape)
  }

  constructor(props, context) {
    super(props, context);

    const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const displayName = `connect(${wrappedName})`;
    this.connectKey = `${displayName}:${Math.random().toString(36).substr(2, 8)}`;

    this.store = context.store || props.store;

    if (!this.store) {
      throw new Error(`Could not find 'store' in either the context or props of component '${displayName}'. Either wrap the root component in <Provider>, or explicitly pass 'store' as a prop to '${displayName}'.`);
    }

    this.state = {
      ...mapStateToProps(this.store.state, props)
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.send = this.send.bind(this);
  }

  componentWillMount() {
    this.store.subscribe('onChange', this.connectKey, this.onUpdate);
  }

  componentWillUnmount() {
    this.store.unsubscribe(this.connectKey);
  }

  onUpdate(state) {
    this.setState(mapStateToProps(state, this.props));
  }

  send(...args) {
    this.store.send(...args);
  }

  render() {
    const { store, ...propsWithoutStore } = this.props;
    const stateToProps = mapStateToProps(this.state, this.props);

    return (
      <WrappedComponent
        {...propsWithoutStore}
        {...stateToProps}
        send={this.send}
      />
    );
  }
};

export default Connect;
