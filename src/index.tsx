// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';

import store from "./store";

ReactDOM.render(
  // tslint:disable-next-line: jsx-wrap-multiline
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);