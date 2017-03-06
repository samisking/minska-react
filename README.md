# minska-react

> React helpers for [minska](https://github.com/samisking/minska).

## Install

```
yarn add minska-react
```

The packages includes ES modules for Webpack 2 and Rollup, CommonJS modules for Node > 6, and Browser modules.

You can also [access the files on unpkg](https://unpkg.com/minska-react/) where you can link them directly in a `<script>` tag and have `window.MinskaReact` available in global scope. The browser builds are compiled  [`minska-react.js`](https://unpkg.com/minska-react/minska-react.js) and [`minska-react.min.js`](https://unpkg.com/minska-react/minska-react.min.js).

## Usage

See [minska](https://github.com/samisking/minska) to see how to set up a store and how it works.

`minska-react` exports `<Provider>` and `connect()`. They work in a similar fashion to `react-redux` in that the `Provider` component passes it's `store` prop as context, and `connect`ed components hook into the store to provide the state to the components they wrap.

#### `<Provider>`

You first wrap your app component, or anything that might want access to the store in a `<Provider>`. _Important:_ You should only have a single `Provider` in your app.

You give it a single prop: `store`. This should be an instance of a `minska` store. All `Provider` does is make the store instance available in context. You shouldn't interact with the store instance directly—instead use `connect()` (explained below).

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'minska-react';
import store from './store';
import MyApp from './MyApp';

render(
  <Provider store={store}>
    // If `MyApp` is a connected component,
    // it will have access to the store
    <MyApp />
  </Provider>,
  document.getElementById('app')
);
```

#### `connect()`

Connecting a component passes the stores current state as props, along with the `send` function allowing the connected component to change the state.

In a similar fashion to `react-redux`, you can also choose what part of the state is passed to the connected component as props. Simply pass a function to connect that returns a slice of the state. Only that slice will be passed on as props instead of the whole state tree.

```js
import React from 'react';
import { connect } from 'minska-react';

const MyApp = ({ count, send }) => {
  const onClick = () => {
    send('incrementBy', 1);
  }

  return (
    <div>
      <h1>Current count: {count}</h1>
      <button onClick={onClick}>+ 1</button>
    </div>
  );
};

// Given the state: `{ count: 1, foo: 'bar' }`
const mapStateToProps = (state, ownProps) => {
  // You also have access to the components original props with `ownProps`
  return { count: state.count };
};

// Then `MyApp` will only be given `count` and `send` as props
export default connect(mapStateToProps)(MyApp);
```
