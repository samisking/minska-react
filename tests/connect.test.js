import React from 'react';
import { mount } from 'enzyme';
import { Store } from 'minska';
import { connect, Provider } from '../src';
import MyApp from './mockApp';

const basicMapStateToProps = state => ({ foo: state.foo });

const setup = (mapStateToProps) => {
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

  const Connect = connect(mapStateToProps)(MyApp);
  const wrapper = mount(
    <Provider store={store}>
      <Connect minska={'ftw'} />
    </Provider>
  );

  const app = wrapper.find(MyApp);

  return {
    store,
    Connect,
    component: wrapper.find(Connect),
    app,
    renderCount: app.find('.render-count'),
    updateFoo: app.find('.update-foo'),
    updateBaz: app.find('.update-baz')
  };
};

// The actual tests
describe('connect()', () => {
  it('renders correctly with mapStateToProps()', () => {
    const { component } = setup(basicMapStateToProps);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with no mapStateToProps()', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly after updates', () => {
    const { renderCount, updateFoo, updateBaz } = setup(basicMapStateToProps);

    // Render count is 0 on constructor, so first render will be 1, then an action fires in
    // componentDidMount so the render count is 2
    expect(renderCount.text()).toEqual('2');

    // Update something from mapStateToProps
    updateFoo.simulate('click', { data: 'new foo' });
    expect(renderCount.text()).toEqual('3');

    // Update something outside mapStateToProps
    updateBaz.simulate('click', { data: 'new baz' });
    expect(renderCount.text()).toEqual('3');
  });

  it('unsubscribes when unmounting', () => {
    const { store, Connect } = setup();

    const subscribe = jest.fn();
    const unsubscribe = jest.fn();

    store.subscribe = subscribe;
    store.unsubscribe = unsubscribe;

    const wrapper = mount(<Connect store={store} />);
    const key = wrapper.instance().connectKey;

    expect(unsubscribe).toHaveBeenCalledTimes(0);
    wrapper.unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).toHaveBeenCalledWith(key);
  });

  it('throws an error when initialising without a store', () => {
    const { Connect } = setup();
    expect(() => mount(<Connect />)).toThrowErrorMatchingSnapshot();
  });
});
