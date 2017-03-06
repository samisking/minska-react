import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Store from 'minska';
import MyApp from './mockApp';
import { Provider, connect } from '../src';

let store;

beforeEach(() => {
  store = new Store({
    state: {
      foo: 'bar'
    },
    reducers: {
      updateFoo: (state, foo) => ({ ...state, foo })
    }
  });
});

// The actual tests
describe('connect', () => {
  it('renders correctly', () => {
    const ConnectedApp = connect()(MyApp);
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('passes correct props', () => {
    const ConnectedApp = connect()(MyApp);
    const component = mount(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );

    expect(component.find(MyApp).props()).toMatchSnapshot();
  });
});
