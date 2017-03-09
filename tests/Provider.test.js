import React from 'react';
import { mount } from 'enzyme';
import { Store } from 'minska';
import { Provider } from '../src';

const setup = () => {
  const store = new Store({
    state: {
      foo: 'bar',
      baz: 'wtf'
    },
    reducers: {
      updateFoo: (state, foo) => ({ ...state, foo }),
      updateBaz: (state, baz) => ({ ...state, baz })
    }
  });

  const wrapper = mount(
    <Provider store={store}>
      <div />
    </Provider>
  );

  return {
    store,
    wrapper
  };
};

describe('<Provider />', () => {
  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('adds the store to context', () => {
    const { store, wrapper } = setup();
    expect(wrapper.state().store).toEqual(store);
    expect(wrapper.instance().getChildContext().store).toEqual(store);
  });
});
